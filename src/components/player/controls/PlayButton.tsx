import React from "react";
import IconButton from "@/components/ui/IconButton";
import {
  usePlayerActions,
  usePlayerPlay,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import LoadingView from "@/components/ui/LoadingView";

export default function PlayButton() {
  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const { setPlay } = usePlayerActions();

  return status === "PLAYING" ? (
    <IconButton
      name={play ? "pause" : "play"}
      color="foreground"
      onPress={() => setPlay(!play)}
    />
  ) : (
    <LoadingView color="foreground" />
  );
}
