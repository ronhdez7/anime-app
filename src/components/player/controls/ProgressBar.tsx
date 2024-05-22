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

const HORIZONTAL_PADDING = 16;

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
  const { setProgress, setSeeking } = usePlayerActions();

  const handleSize = useSharedValue(10);

  const handleAnimatedStyle = useAnimatedStyle(() => ({
    width: handleSize.value,
    height: handleSize.value,
    right: (handleSize.value / 2) * -1,
  }));

  function startSeeking(e: GestureResponderEvent) {
    setSeeking(true);
    setProgress(
      calculateProgress(
        e.nativeEvent.pageX - HORIZONTAL_PADDING,
        seekbarWidth,
        duration
      )
    );
    handleSize.value = withSpring(20);
  }

  function updateSeeking(e: GestureResponderEvent) {
    setProgress(
      calculateProgress(
        e.nativeEvent.pageX - HORIZONTAL_PADDING,
        seekbarWidth,
        duration
      )
    );
  }

  function endSeeking(e: GestureResponderEvent) {
    setProgress(
      calculateProgress(
        e.nativeEvent.pageX - HORIZONTAL_PADDING,
        seekbarWidth,
        duration
      )
    );
    setSeeking(false);
    handleSize.value = withSpring(10);
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* Seekbar */}
        <View
          style={styles.seekbarContainer}
          onLayout={(e) => setSeekbarWidth(e.nativeEvent.layout.width)}
          onTouchStart={startSeeking}
          onTouchMove={updateSeeking}
          onTouchEnd={endSeeking}
        >
          <View style={styles.seekbar}>
            <View style={styles.covered(progress, duration)}>
              <Animated.View style={[styles.handle, handleAnimatedStyle]} />
            </View>
          </View>
        </View>

        <Text color="foreground" style={styles.text}>
          {progress}
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: { flex: 1 },
  main: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: HORIZONTAL_PADDING,
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.sm,
  },
  seekbarContainer: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
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
  }),
  handle: {
    position: "absolute",
    borderRadius: 10000,
    backgroundColor: theme.colors.primary,
    right: -5,
    height: 10,
    width: 10,
  },
  text: {
    width: 40,
    textAlign: "center",
  },
}));
