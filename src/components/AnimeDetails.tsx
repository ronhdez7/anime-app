import { ScrollView, View } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";
import { AnimeData } from "@/types";
import { useFindAnime } from "@/queries/use-find-anime";

interface AnimeDetailsProps {
  anime: AnimeData;
}

export default function AnimeDetails({ anime }: AnimeDetailsProps) {
  const { styles } = useStyles(stylesheet);

  useFindAnime({
    title: anime.titles.jp,
    title_en: anime.titles.en,
  });

  const year = anime.dates.from.year;

  return (
    <View style={styles.main}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text weight="bold" size="xl">
          {anime.title}
        </Text>
      </ScrollView>
      <View style={styles.quickInfo}>
        {year && <Text size="sm">{year}</Text>}
        {anime.rating && <Text size="sm">{anime.rating}</Text>}
        {anime.episodeCount !== undefined && (
          <Text size="sm">{anime.episodeCount} episodes</Text>
        )}
      </View>
      <Text size="smd" numberOfLines={4} style={styles.description}>
        {anime.description}
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
