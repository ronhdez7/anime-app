import { View, Text } from "react-native";
import React from "react";
import { MaybeFullData } from "@/types";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface AnimeDetailsProps {
  anime: MaybeFullData;
}

export default function AnimeDetails({ anime }: AnimeDetailsProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.main}>
      <Text>
        {anime.title}
        {anime.mal_id}
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { height: 2000, backgroundColor: theme.colors.background },
}));
