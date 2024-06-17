import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Text from "@/components/ui/Text";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import WatchScreen from "@/components/watch/WatchScreen";
import SafeArea from "@/components/ui/SafeArea";
import * as ScreenOrientation from "expo-screen-orientation";

type Params = {
  animeId: string;
  episode: string;
};

export default function WatchPage() {
  const { animeId, episode } = useLocalSearchParams<Params>();
  const { styles } = useStyles(stylesheet);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (!animeId) {
    return (
      <View style={styles.error}>
        <Text>Sorry, this page does not know which anime to load</Text>
        <Text>Please try going back and navigating back to this page</Text>
      </View>
    );
  }
  return (
    <SafeArea>
      <Stack.Screen
        options={{
          statusBarHidden: true,
          statusBarAnimation: "slide",
          statusBarTranslucent: true,
          statusBarStyle: "light",
          statusBarColor: "transparent",
        }}
      />

      <WatchScreen animeId={animeId} episodeNumber={Number(episode)} />
    </SafeArea>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
}));
