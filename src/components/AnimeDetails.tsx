import { ScrollView, View } from "react-native";
import React from "react";
import { MaybeFullData } from "@/types";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";

interface AnimeDetailsProps {
  anime: MaybeFullData;
}

export default function AnimeDetails({ anime }: AnimeDetailsProps) {
  const { styles } = useStyles(stylesheet);

  const year = anime.year ?? anime.aired.prop.from.year;
  const rating = anime.rating?.trim().split(" ")[0];
  const episodeCount = anime.episodes;

  return (
    <View style={styles.main}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text weight="bold" size="lg">
          {anime.title}
        </Text>
      </ScrollView>
      <View style={styles.quickInfo}>
        {year && <Text size="sm">{year}</Text>}
        {rating && <Text size="sm">{rating}</Text>}
        {episodeCount !== undefined && (
          <Text size="sm">{episodeCount} episodes</Text>
        )}
      </View>
      <Text size="smd" numberOfLines={4} style={styles.description}>
        {anime.synopsis}
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  quickInfo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.lg,
  },
  description: {
    paddingTop: theme.spacing.md,
    lineHeight: 20,
  },
}));
