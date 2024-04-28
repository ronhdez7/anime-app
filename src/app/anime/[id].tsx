import React from "react";
import { useLocalSearchParams } from "expo-router";
import AnimeScreen from "@/components/AnimeScreen";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";

type Params = {
  id: string;
};

export default function AnimePage() {
  const { id } = useLocalSearchParams<Params>();
  const { styles } = useStyles(stylesheet);

  if (!id) {
    return (
      <View style={styles.error}>
        <Text>Sorry, this page does not know which anime to load</Text>
        <Text>Please try going back and navigating back to this page</Text>
      </View>
    );
  }

  return <AnimeScreen id={id} />;
}

const stylesheet = createStyleSheet(() => ({
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
