import React from "react";
import IconButton from "@/components/ui/IconButton";
import {
  VideoState,
  usePlayerActions,
  usePlayerPlay,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import LoadingView from "@/components/ui/LoadingView";
import { PauseIcon, PlayIcon } from "@/components/icons";

export default function PlayButton() {
  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const { setPlay } = usePlayerActions();

  const PlayingIcon = play ? PauseIcon : PlayIcon;

  return status === VideoState.PLAYING ? (
    <IconButton onPress={() => setPlay(!play)}>
      <PlayingIcon color="foreground" />
    </IconButton>
  ) : (
    <LoadingView color="foreground" />
  );
}
