import { View } from "react-native";
import Player from "./Player";
import { VideoPlayer } from "expo-video";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface PlayerWithControlsProps {
  player: VideoPlayer;
}

export default function PlayerWithControls({
  player,
}: PlayerWithControlsProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Player player={player} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
}));
