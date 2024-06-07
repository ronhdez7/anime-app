import { VideoSource, VideoView, useVideoPlayer } from "expo-video";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Controls, { ControlDisplayProps } from "./Controls";
import { usePlayerSpeed } from "@/stores/PlayerStore";

export type VideoSourceObject = Extract<VideoSource, object>;

export interface PlayerProps {
  source: VideoSourceObject;

  controls?: ControlDisplayProps;
}

export default function Player({ source, controls }: PlayerProps) {
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
      <Controls player={player} source={source} {...controls} />
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
