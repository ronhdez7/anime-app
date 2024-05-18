import { View } from "react-native";
import Player from "./Player";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AVPlaybackSource, ResizeMode } from "expo-av";

interface PlayerWithControlsProps {
  source: AVPlaybackSource;
}

export default function PlayerWithControls({
  source,
}: PlayerWithControlsProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Player
        source={source}
        style={{ width: "100%", height: "100%" }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
}));
