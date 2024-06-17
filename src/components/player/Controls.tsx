import {
  VideoState,
  usePlayerActions,
  usePlayerSeeking,
  usePlayerShowControls,
  usePlayerSpeed,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import { VideoPlayer } from "expo-video";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BackButton from "./BackButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import SeekBar from "./SeekBar";
import FullscreenButton from "./FullscreenButton";
import { VideoSourceObject } from "./Player";
import RewindButton from "./RewindButton";
import ForwardButton from "./ForwardButton";

export interface ControlDisplayProps {
  disableBackButton?: boolean;
  disablePlayButton?: boolean;
  disableSettingsButton?: boolean;
  disableFullscreenButton?: boolean;
  disableRewindButton?: boolean;
  disableForwardButton?: boolean;
}

interface ControlsProps extends ControlDisplayProps {
  player: VideoPlayer;
  source: VideoSourceObject;
}

const CONTROLS_TIMEOUT = 5000;

export default function Controls({
  player,
  source,
  disableBackButton,
  disablePlayButton,
  disableSettingsButton,
  disableFullscreenButton,
  disableRewindButton,
  disableForwardButton,
}: ControlsProps) {
  const { styles } = useStyles(stylesheet);

  const speed = usePlayerSpeed();
  const status = usePlayerStatus();
  const showControls = usePlayerShowControls();
  const seeking = usePlayerSeeking();
  const { setShowControls, setStatus, setDuration, setProgress, setPlay } =
    usePlayerActions();
  const controlsTimerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  function handlePressOnOverlay() {
    clearTimeout(controlsTimerRef.current);
    if (!showControls) {
      setShowControls(true);
      if (status === VideoState.PLAYING) {
        controlsTimerRef.current = setTimeout(
          () => setShowControls(false),
          CONTROLS_TIMEOUT
        );
      }
    } else {
      setShowControls(false);
    }
  }

  function handlePressOnControl(e: GestureResponderEvent) {
    e.stopPropagation();
    clearTimeout(controlsTimerRef.current);
    setShowControls(true); // make sure controls stay visible
    if (status === VideoState.PLAYING) {
      controlsTimerRef.current = setTimeout(
        () => setShowControls(false),
        CONTROLS_TIMEOUT
      );
    }
  }

  function handleVideoEnd() {
    setStatus(VideoState.ENDED);
    setShowControls(true);
    clearTimeout(controlsTimerRef.current);
  }

  useEffect(() => {
    const statusSubscription = player.addListener(
      "statusChange",
      (playerStatus) => {
        setDuration(player.duration * 1000);
        if (playerStatus === "readyToPlay") {
          setStatus(VideoState.PLAYING);
        } else {
          clearTimeout(controlsTimerRef.current);
          setShowControls(true);
          if (
            playerStatus === "idle" &&
            Math.floor(player.currentTime) >= Math.floor(player.duration)
          )
            return;

          setStatus(VideoState.LOADING);
        }
      }
    );

    const endSubscription = player.addListener("playToEnd", () => {
      handleVideoEnd();
    });

    return () => {
      statusSubscription.remove();
      endSubscription.remove();
      clearTimeout(controlsTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (seeking) {
      clearTimeout(controlsTimerRef.current);
      setShowControls(true);
    } else {
      if (status === VideoState.PLAYING) {
        controlsTimerRef.current = setTimeout(
          () => setShowControls(false),
          CONTROLS_TIMEOUT
        );
      }
    }
  }, [seeking]);

  useEffect(() => {
    setPlay(false);
    if (source.uri) {
      setStatus(VideoState.PLAYING);

      progressIntervalRef.current = setInterval(() => {
        setDuration(player.duration * 1000);
        setProgress(player.currentTime * 1000);
      }, 1000 / speed);
    } else {
      setStatus(VideoState.LOADING);
      setDuration(0);
      setProgress(0);
    }

    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [source.uri]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePressOnOverlay}>
        <View
          style={styles.controlsContainer(showControls)}
          pointerEvents={showControls ? undefined : "box-only"}
        >
          {/* Back Button */}
          {!disableBackButton && (
            <ControlPosition style={styles.backButton}>
              <BackButton player={player} onPress={handlePressOnControl} />
            </ControlPosition>
          )}

          {/* Settings Button */}
          {!disableSettingsButton && (
            <ControlPosition style={styles.settingsButton}>
              <SettingsButton player={player} onPress={handlePressOnControl} />
            </ControlPosition>
          )}

          <View style={[styles.navBar, styles.centerNav]}>
            {!disableRewindButton && (
              <ControlPosition>
                <RewindButton player={player} onPress={handlePressOnControl} />
              </ControlPosition>
            )}

            {/* Play Button */}
            {!disablePlayButton && (
              <ControlPosition>
                <PlayButton player={player} onPress={handlePressOnControl} />
              </ControlPosition>
            )}

            {!disableForwardButton && (
              <ControlPosition>
                <ForwardButton player={player} onPress={handlePressOnControl} />
              </ControlPosition>
            )}
          </View>
          <View style={[styles.navBar, styles.bottomNav]}>
            {/* Seek Bar */}
            <ControlPosition style={styles.seekBar}>
              <SeekBar player={player} onPress={handlePressOnControl} />
            </ControlPosition>

            {/* Fullscreen Button */}
            {/* {!disableFullscreenButton && (
              <ControlPosition>
                <FullscreenButton
                  player={player}
                  onPress={handlePressOnControl}
                />
              </ControlPosition>
            )} */}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  controlsContainer: (show: boolean) => ({
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.20)",
    opacity: show ? 1 : 0,
  }),

  // Controls
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  settingsButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  centerNav: {
    justifyContent: "space-evenly",
  },
  bottomNav: {
    bottom: 0,
    left: 0,
    paddingVertical: theme.spacing.xs,
  },
  navBar: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  seekBar: {
    flex: 1,
  },
}));

interface ControlButtonProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
function ControlPosition({ style, children }: ControlButtonProps) {
  return <View style={style}>{children}</View>;
}

export interface ControlProps {
  onPress?: (e: GestureResponderEvent) => void;
  player: VideoPlayer;
}
