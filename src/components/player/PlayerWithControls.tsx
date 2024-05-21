import { View } from "react-native";
import Player from "./Player";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AVPlaybackSource, AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import Controls from "./controls";
import {
  usePlayerActions,
  usePlayerPlay,
  usePlayerProgress,
  usePlayerSpeed,
} from "@/stores/PlayerStore";
import { useCallback, useEffect, useRef } from "react";

interface PlayerWithControlsProps {
  source: AVPlaybackSource;
}

export default function PlayerWithControls({
  source,
}: PlayerWithControlsProps) {
  const { styles } = useStyles(stylesheet);
  const playerRef = useRef<Video>(null);

  const { setProgress, setStatus, setDuration } = usePlayerActions();
  const progress = usePlayerProgress();
  const play = usePlayerPlay();
  const speed = usePlayerSpeed();

  const onPlaybackUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.isBuffering) {
      if (!status.isPlaying && status.shouldPlay) setStatus("BUFFERING");
    } else {
      setStatus("PLAYING");
      setProgress(status.positionMillis);
    }

    setDuration(status.durationMillis ?? 0);
  }, []);

  useEffect(() => {
    if (!play) playerRef.current?.setPositionAsync(progress);
  }, [progress, play]);

  return (
    <View style={styles.container}>
      <Player
        ref={playerRef}
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackUpdate}
        rate={speed}
        progressUpdateIntervalMillis={1000 / speed}
        shouldPlay={play}
      />
      <Controls />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
}));
