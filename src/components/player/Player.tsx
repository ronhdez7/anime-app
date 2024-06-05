import { VideoSource, VideoView, useVideoPlayer } from "expo-video";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Controls from "./Controls";
import { usePlayerSpeed } from "@/stores/PlayerStore";

export type VideoSourceObject = Extract<VideoSource, object>;

interface PlayerProps {
  source: VideoSourceObject;
}

export default function Player({ source }: PlayerProps) {
  const { styles } = useStyles(stylesheet);

  const speed = usePlayerSpeed();
  const player = useVideoPlayer(source, (player) => {
    player.playbackRate = speed;
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
      />
      <Controls player={player} source={source} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
}));
