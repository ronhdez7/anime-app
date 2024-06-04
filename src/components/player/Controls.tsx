import {
  VideoState,
  usePlayerActions,
  usePlayerSeeking,
  usePlayerShowControls,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import { VideoPlayer } from "expo-video";
import { useEffect, useRef } from "react";
import {
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

interface ControlsProps {
  player: VideoPlayer;
}

const CONTROLS_TIMEOUT = 5000;

export default function Controls({ player }: ControlsProps) {
  const { styles } = useStyles(stylesheet);

  const status = usePlayerStatus();
  const showControls = usePlayerShowControls();
  const seeking = usePlayerSeeking();
  const {
    setShowControls,
    setStatus,
    setDuration,
    setProgress,
    incrementProgress,
  } = usePlayerActions();
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

  useEffect(() => {
    const statusSubscription = player.addListener("statusChange", (status) => {
      if (status === "readyToPlay") {
        setDuration(player.duration * 1000);
        setStatus(VideoState.PLAYING);
      } else {
        clearTimeout(controlsTimerRef.current);
        setShowControls(true);
        setStatus(VideoState.LOADING);
      }
    });

    // update progress manually depedning on playing state
    const progressSubscription = player.addListener(
      "playingChange",
      (playing) => {
        if (playing) {
          progressIntervalRef.current = setInterval(() => {
            incrementProgress();
          }, 1000);
        } else {
          clearInterval(progressIntervalRef.current);
          setProgress(player.currentTime * 1000);
        }
      }
    );

    /* doesn't work for some reason */
    // polling player to make sure everything is updated
    // in case that something fails
    // updateIntervalRef.current = setInterval(() => {
    //   if (player.status === "readyToPlay") {
    //     setStatus(VideoState.PLAYING);
    //   }
    // }, 3000);

    return () => {
      statusSubscription.remove();
      progressSubscription.remove();
      clearInterval(progressIntervalRef.current);
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

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePressOnOverlay}>
        <View
          style={styles.controlsContainer(showControls)}
          pointerEvents={showControls ? undefined : "box-only"}
        >
          {/* Back Button */}
          <ControlPosition style={styles.backButton}>
            <BackButton player={player} onPress={handlePressOnControl} />
          </ControlPosition>

          {/* Play Button */}
          <ControlPosition style={styles.playButton}>
            <PlayButton player={player} onPress={handlePressOnControl} />
          </ControlPosition>

          {/* Settings Button */}
          <ControlPosition style={styles.settingsButton}>
            <SettingsButton player={player} onPress={handlePressOnControl} />
          </ControlPosition>

          <View style={styles.bottomNav}>
            {/* Seek Bar */}
            <ControlPosition style={styles.seekBar}>
              <SeekBar player={player} onPress={handlePressOnControl} />
            </ControlPosition>

            {/* Fullscreen Button */}
            <ControlPosition>
              <FullscreenButton
                player={player}
                onPress={handlePressOnControl}
              />
            </ControlPosition>
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
  playButton: {
    position: "absolute",
  },
  settingsButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
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
