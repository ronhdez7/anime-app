import { View } from "react-native";
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

export default function SeekBar({ player, onPress }: ControlProps) {
  const { styles, theme } = useStyles(stylesheet);

  const duration = usePlayerDurationInSecs();
  const progress = usePlayerProgressInSecs();
  const { setProgress, setSeeking } = usePlayerActions();

  function beganSeeking() {
    setSeeking(true);
  }

  function finishSeeking(value: number) {
    setSeeking(false);
    player.currentTime = value;
    setProgress(value * 1000);
  }

  const progressText = convertSecondsToTime(progress);
  const durationText = convertSecondsToTime(duration);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text color="foreground" size="sm">
          {progressText} / {durationText}
        </Text>
      </View>
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
        // initial value only
        value={progress}
      />
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
  progressContainer: {
    paddingLeft: theme.spacing.md,
  },
}));
