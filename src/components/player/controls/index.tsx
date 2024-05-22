import { Pressable, View } from "react-native";
import React, { PropsWithChildren, memo, useReducer } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import SettingsButton from "./SettingsButton";
import BackButton from "./BackButton";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";

function StopPressPropagation({ children }: PropsWithChildren) {
  return (
    <Pressable
      style={{ flexDirection: "row" }}
      onPress={(e) => e.stopPropagation()}
      children={children}
    />
  );
}

export default memo(function Controls() {
  const { styles } = useStyles(stylesheet);

  const [showControls, toggleControls] = useReducer((v) => !v, true);

  return (
    <Pressable style={styles.container} onPress={toggleControls}>
      <View
        pointerEvents={showControls ? undefined : "none"}
        style={styles.controls(showControls)}
      >
        <View style={styles.bar}>
          <StopPressPropagation>
            <BackButton />
          </StopPressPropagation>
          <StopPressPropagation>
            <SettingsButton />
          </StopPressPropagation>
        </View>

        <View style={[styles.bar, styles.fill]}>
          <View style={styles.fill}></View>
          <StopPressPropagation>
            <PlayButton />
          </StopPressPropagation>
          <View style={styles.fill}></View>
        </View>

        <View style={styles.bar}>
          <StopPressPropagation>
            <ProgressBar />
          </StopPressPropagation>
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
  fill: {
    flex: 1,
  },
}));
