import React from "react";
import { useLocalSearchParams } from "expo-router";
import Text from "@/components/ui/Text";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import WatchScreen from "@/components/watch/WatchScreen";

type Params = {
  animeId: string;
  episode: string;
};

export default function WatchPage() {
  const { animeId, episode } = useLocalSearchParams<Params>();
  const { styles } = useStyles(stylesheet);

  if (!animeId) {
    return (
      <View style={styles.error}>
        <Text>Sorry, this page does not know which anime to load</Text>
        <Text>Please try going back and navigating back to this page</Text>
      </View>
    );
  }
  return <WatchScreen animeId={animeId} episodeNumber={Number(episode)} />;
}

const stylesheet = createStyleSheet((theme) => ({
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
