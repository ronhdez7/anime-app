import React from "react";
import IconButton from "@/components/ui/IconButton";
import {
  VideoState,
  usePlayerActions,
  usePlayerPlay,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import LoadingView from "@/components/ui/LoadingView";

export default function PlayButton() {
  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const { setPlay } = usePlayerActions();

  return status === VideoState.PLAYING ? (
    <IconButton
      name={play ? "pause" : "play"}
      color="foreground"
      onPress={() => setPlay(!play)}
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    />
  ) : (
    <LoadingView color="foreground" />
  );
}
