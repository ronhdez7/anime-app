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

export default function PlayButton({ player, onPress }: ControlProps) {
  const { styles } = useStyles(stylesheet);

  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const { setPlay } = usePlayerActions();

  const loading = status !== VideoState.PLAYING;
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

  return (
    <View>
      {loading ? (
        <Pressable onPress={onPress}>
          <LoadingView color="foreground" />
        </Pressable>
      ) : (
        <IconButton onPress={togglePlay}>
          <PlayingIcon color="foreground" />
        </IconButton>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({}));
