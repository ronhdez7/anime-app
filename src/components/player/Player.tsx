import { View } from "react-native";
import Video from "./Video";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import {
  AVPlaybackSource,
  AVPlaybackStatus,
  ResizeMode,
  Video as VideoAV,
} from "expo-av";
import Controls from "./controls";
import {
  VideoState,
  usePlayerActions,
  usePlayerPlay,
  usePlayerProgress,
  usePlayerSeeking,
  usePlayerSpeed,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import { useCallback, useEffect, useRef } from "react";

interface PlayerWithControlsProps {
  source: AVPlaybackSource;
}

export default function Player({ source }: PlayerWithControlsProps) {
  const { styles } = useStyles(stylesheet);
  const videoRef = useRef<VideoAV>(null);
  const firstRun = useRef(true);

  const { setProgress, setStatus, setDuration, reset } = usePlayerActions();
  const progress = usePlayerProgress();
  const play = usePlayerPlay();
  const speed = usePlayerSpeed();
  const seeking = usePlayerSeeking();
  const status = usePlayerStatus();

  const onLoad = useCallback(() => {
    setStatus(VideoState.BUFFERING);
  }, []);

  const onPlaybackUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      if (!status.isPlaying && status.shouldPlay) {
        setStatus(VideoState.BUFFERING);
      } else {
        setStatus(VideoState.PLAYING);
      }

      if (!seeking) {
        setProgress(status.positionMillis);
      }
      setDuration(status.durationMillis ?? 0);
    },
    [seeking]
  );

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (seeking || !videoRef.current) return;

    setStatus(VideoState.BUFFERING);
    videoRef.current?.setPositionAsync(progress);
  }, [seeking]);

  useEffect(() => reset, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={source}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={
          status === VideoState.LOADING ? undefined : onPlaybackUpdate
        }
        rate={1000 / speed}
        progressUpdateIntervalMillis={1000 / (speed * 2)}
        shouldPlay={play}
        onLoad={onLoad}
      />
      <Controls />
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  video: { width: "100%", height: "100%", backgroundColor: "black" },
}));
