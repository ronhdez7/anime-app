import React, { memo } from "react";
import IconButton from "@/components/ui/IconButton";
import {
  VideoState,
  usePlayerActions,
  usePlayerPlay,
  usePlayerStatus,
} from "@/stores/PlayerStore";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { GestureResponderEvent, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import SpinningLoader from "@/components/ui/SpinningLoader";

export default memo(function PlayButton() {
  const { styles } = useStyles(stylesheet);
  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const { setPlay, setShowControls } = usePlayerActions();

  const PlayingIcon = play ? PauseIcon : PlayIcon;

  function handlePress(e: GestureResponderEvent) {
    e.stopPropagation();
    setPlay(!play);
    setShowControls(true);
  }

  return (
    <View style={styles.container}>
      {status === VideoState.PLAYING ? (
        <IconButton onPress={handlePress}>
          <PlayingIcon color="foreground" />
        </IconButton>
      ) : (
        <IconButton>
          <SpinningLoader color="foreground" />
        </IconButton>
      )}
    </View>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.overlay,
    borderRadius: 10000,
  },
}));
