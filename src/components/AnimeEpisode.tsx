import { TouchableOpacity } from "react-native";
import React from "react";
import { EpisodeData } from "@/types";
import Text from "./ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { MALID } from "@/types/jikan";
import { Link } from "expo-router";

interface Props {
  episode: EpisodeData;
  animeId: MALID;
}

export default function AnimeEpisode({ episode, animeId }: Props) {
  const { styles } = useStyles(stylesheet);

  return (
    <Link href={`/watch/${animeId}/${episode.id}`} asChild>
      <TouchableOpacity style={styles.main}>
        <Text numberOfLines={1}>{episode.title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    backgroundColor: theme.colors.neutral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));
