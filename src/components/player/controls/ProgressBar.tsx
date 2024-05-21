import { GestureResponderEvent, View } from "react-native";
import React, { useState } from "react";
import {
  usePlayerActions,
  usePlayerDurationInSecs,
  usePlayerProgressInSecs,
} from "@/stores/PlayerStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import { clamp } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

function calculateProgress(
  trackWidth: number,
  seekbarWidth: number,
  duration: number
) {
  return clamp((trackWidth / seekbarWidth) * duration, duration, 0) * 1000;
}

export default function ProgressBar() {
  const { styles } = useStyles(stylesheet);
  const progress = usePlayerProgressInSecs();
  const duration = usePlayerDurationInSecs();

  const [seekbarWidth, setSeekbarWidth] = useState(0);
  const { setProgress, setPlay } = usePlayerActions();

  const handleSize = useSharedValue(10);

  const handleAnimatedStyle = useAnimatedStyle(() => ({
    width: handleSize.value,
    height: handleSize.value,
  }));

  function startSeeking(e: GestureResponderEvent) {
    setPlay(false);
    setProgress(
      calculateProgress(e.nativeEvent.pageX - 8, seekbarWidth, duration)
    );
    handleSize.value = withSpring(20);
  }

  function updateSeeking(e: GestureResponderEvent) {
    setProgress(
      calculateProgress(e.nativeEvent.pageX - 8, seekbarWidth, duration)
    );
  }

  function endSeeking(e: GestureResponderEvent) {
    setProgress(
      calculateProgress(e.nativeEvent.pageX - 8, seekbarWidth, duration)
    );
    setPlay(true);
    handleSize.value = withSpring(10);
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* Seekbar */}
        <View style={styles.seekbarContainer}>
          <View
            style={styles.seekbar}
            onLayout={(e) => setSeekbarWidth(e.nativeEvent.layout.width)}
            onTouchStart={startSeeking}
            onTouchMove={updateSeeking}
            onTouchEnd={endSeeking}
          >
            <View style={styles.covered(progress, duration)}>
              <Animated.View
                style={[styles.handle, handleAnimatedStyle]}
              ></Animated.View>
            </View>
          </View>
        </View>

        <Text color="foreground">{progress}</Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: { flex: 1 },
  main: {
    padding: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.sm,
  },
  seekbarContainer: {
    flex: 1,
  },
  seekbar: {
    backgroundColor: theme.colors.foreground,
    position: "relative",
    width: "100%",
    height: 4,
    borderRadius: 10000,
    flexDirection: "row",
  },
  covered: (progress: number, duration: number) => ({
    flex: progress / duration || 0,
    backgroundColor: theme.colors.primary,
    height: "100%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  }),
  handle: {
    position: "absolute",
    borderRadius: 10000,
    backgroundColor: theme.colors.primary,
  },
}));
