import { View } from "react-native";
import React from "react";
import WatchPlayer from "./WatchPlayer";
import { ID } from "@/types";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface WatchScreenProps {
  animeId: ID;
  episodeNumber?: number;
}

export default function WatchScreen({
  animeId,
  episodeNumber = 1,
}: WatchScreenProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.page}>
      <WatchPlayer animeId={animeId} episodeNumber={episodeNumber} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  page: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flex: 1,
  },
}));
