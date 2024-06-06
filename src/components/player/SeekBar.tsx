import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ControlProps } from "./Controls";
import Slider from "@react-native-community/slider";
import {
  usePlayerActions,
  usePlayerDurationInSecs,
  usePlayerProgressInSecs,
} from "@/stores/PlayerStore";
import Text from "../ui/Text";
import { convertSecondsToTime } from "@/lib/utils";
import { useState } from "react";

export default function SeekBar({ player, onPress }: ControlProps) {
  const { styles, theme } = useStyles(stylesheet);

  const duration = usePlayerDurationInSecs();
  const progress = usePlayerProgressInSecs();
  const { setProgress, setSeeking } = usePlayerActions();

  const [localProgress, setLocalProgress] = useState<number>();

  function beganSeeking() {
    setLocalProgress(progress);
    setSeeking(true);
  }

  function finishSeeking(value: number) {
    setSeeking(false);
    player.currentTime = value;
    setProgress(value * 1000);

    // onValueChange is called after finishSeeking,
    // so reseting localProgress has to be delayed
    setTimeout(() => {
      setLocalProgress(undefined);
    }, 0);
  }

  const localProgressText =
    localProgress !== undefined
      ? convertSecondsToTime(localProgress)
      : undefined;
  const playerProgressText = convertSecondsToTime(progress);
  const progressText = localProgressText ?? playerProgressText;
  const durationText = convertSecondsToTime(duration);
  const textLength = progressText.length + durationText.length + 1;

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer(textLength)]}>
        <Text color="foreground" size="sm" style={styles.progressText}>
          {progressText}
        </Text>

        <Text color="foreground" size="sm">
          /
        </Text>

        <Text color="foreground" size="sm" style={styles.progressText}>
          {durationText}
        </Text>
      </View>

      <Pressable onPress={onPress} style={styles.pressableArea}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.foreground}
          thumbTintColor={theme.colors.primary}
          step={1}
          tapToSeek
          onSlidingStart={beganSeeking}
          onSlidingComplete={finishSeeking}
          onValueChange={setLocalProgress}
          // initial value only
          value={progress}
        />
      </Pressable>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: "flex-start",
  },
  slider: {
    width: "100%",
  },
  pressableArea: {
    width: "100%",
  },
  progressContainer: (chars: number = 0) => ({
    paddingLeft: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: chars < 12 ? chars * 8 : chars * 7.5,
  }),
  progressText: {
    textAlign: "center",
  },
}));
