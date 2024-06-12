import { GestureResponderEvent, Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import IconButton from "../ui/IconButton";
import { PauseIcon, PlayIcon } from "../icons";
import { ControlProps } from "./Controls";
import {
  VideoState,
  usePlayerActions,
  usePlayerPlay,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import LoadingView from "../ui/LoadingView";
import { RefreshIcon } from "../icons/RefreshIcon";

export default function PlayButton({ player, onPress }: ControlProps) {
  const { styles } = useStyles(stylesheet);

  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const { setPlay, setStatus } = usePlayerActions();

  const PlayingIcon = play ? PauseIcon : PlayIcon;

  function togglePlay(e: GestureResponderEvent) {
    onPress?.(e);
    if (play) {
      player.pause();
    } else {
      player.play();
    }
    setPlay(!play);
  }

  function replay() {
    player.replay();
    setPlay(true);
    setStatus(VideoState.PLAYING);
  }

  return (
    <View style={styles.container}>
      {status === VideoState.ENDED ? (
        <IconButton onPress={replay}>
          <RefreshIcon color="foreground" />
        </IconButton>
      ) : status === VideoState.PLAYING ? (
        <IconButton onPress={togglePlay}>
          <PlayingIcon color="foreground" />
        </IconButton>
      ) : (
        <Pressable onPress={onPress}>
          <LoadingView color="foreground" />
        </Pressable>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: theme.sizes.icon.md,
    height: theme.sizes.icon.md,
  },
}));
