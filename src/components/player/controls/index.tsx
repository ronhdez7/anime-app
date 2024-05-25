import { Pressable, View } from "react-native";
import React, { memo, useEffect, useRef } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import SettingsButton from "./SettingsButton";
import BackButton from "./BackButton";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import FullscreenButton from "./FullscreenButton";
import {
  VideoState,
  usePlayerActions,
  usePlayerPlay,
  usePlayerSeeking,
  usePlayerShowControls,
  usePlayerStatus,
} from "@/stores/PlayerStore";

const CONTROLS_VIEW_TIME = 5000;

export default memo(function Controls() {
  const { styles } = useStyles(stylesheet);
  const timerRef = useRef<NodeJS.Timeout>();

  const status = usePlayerStatus();
  const play = usePlayerPlay();
  const seeking = usePlayerSeeking();
  const showControls = usePlayerShowControls();
  const { setShowControls } = usePlayerActions();

  function setHideTimer() {
    timerRef.current = setTimeout(
      () => setShowControls(false),
      CONTROLS_VIEW_TIME
    );
  }

  function toggleControls() {
    setShowControls(!showControls);
  }

  useEffect(() => {
    setShowControls(true);
    setHideTimer();

    return () => clearTimeout(timerRef.current);
  }, [play]);

  useEffect(() => {
    if (showControls) {
      setHideTimer();
    } else {
      clearTimeout(timerRef.current);
    }
  }, [showControls]);

  useEffect(() => {
    if (seeking || status !== VideoState.PLAYING) {
      clearTimeout(timerRef.current);
      setShowControls(true);
    } else {
      setHideTimer();
    }
  }, [seeking, status]);

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
    backgroundColor: "rgba(0, 0, 0, 0.15)",
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
