import { Pressable, View } from "react-native";
import React, { memo, useEffect } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import SettingsButton from "./SettingsButton";
import BackButton from "./BackButton";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import FullscreenButton from "./FullscreenButton";
import { usePlayerActions, usePlayerShowControls } from "@/stores/PlayerStore";

export default memo(function Controls() {
  const { styles } = useStyles(stylesheet);

  const showControls = usePlayerShowControls();
  const { setShowControls } = usePlayerActions();

  function toggleControls() {
    setShowControls(!showControls);
  }

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (showControls) {
  //     timer = setTimeout(() => toggleControls(), 5000);
  //   }

  //   return () => clearTimeout(timer);
  // }, [showControls]);

  return (
    <Pressable style={styles.container} onPress={toggleControls}>
      <View
        pointerEvents={showControls ? undefined : "none"}
        style={styles.controls(showControls)}
      >
        <View style={styles.bar}>
          <BackButton />
          <SettingsButton />
        </View>

        <View style={[styles.bar, styles.fill]}>
          <View style={styles.fill}></View>
          <PlayButton />
          <View style={styles.fill}></View>
        </View>

        <View style={[styles.bar, styles.bottomBar]}>
          <ProgressBar />
          <FullscreenButton />
        </View>
      </View>
    </Pressable>
  );
});

const stylesheet = createStyleSheet(() => ({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "transparent",
  },
  controls: (show: boolean) => ({
    opacity: show ? 1 : 0,
    height: "100%",
  }),
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBar: {
    alignItems: "flex-end",
  },
  fill: {
    flex: 1,
  },
}));
