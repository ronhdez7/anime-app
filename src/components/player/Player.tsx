import { VideoSource, VideoView, useVideoPlayer } from "expo-video";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Controls, { ControlDisplayProps } from "./Controls";
import { usePlayerSpeed } from "@/stores/PlayerStore";

export type VideoSourceObject = Extract<VideoSource, object>;

export interface PlayerProps {
  source: VideoSourceObject;
  controls?: ControlDisplayProps;
  takeHeight?: boolean;
}

export default function Player({ source, controls, takeHeight }: PlayerProps) {
  const { styles } = useStyles(stylesheet);

  const speed = usePlayerSpeed();
  const player = useVideoPlayer(source, (player) => {
    player.playbackRate = speed;
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video(takeHeight ?? false)}
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
    height: "100%",
    position: "relative",
    backgroundColor: "black",
  },
  video: (takeHeight: boolean) => ({
    height: takeHeight ? "100%" : undefined,
    width: takeHeight ? undefined : "100%",
    aspectRatio: 16 / 9,
  }),
}));
