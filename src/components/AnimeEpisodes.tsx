import { View } from "react-native";
import React from "react";
import { EpisodeData, MaybeFullData } from "@/types";
import { useAnimeEpisodes } from "@/queries/jikan/use-anime-episodes";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";
import List from "./ui/List";
import AnimeFetchError from "./AnimeFetchError";
import LoadingView from "./ui/LoadingView";
import AnimeEpisode from "./AnimeEpisode";

interface Props {
  anime: MaybeFullData;
}

export default function AnimeEpisodes({ anime }: Props) {
  const { styles } = useStyles(stylesheet);

  const episodes = useAnimeEpisodes(anime.mal_id);

  return (
    <View style={styles.main}>
      <Text size="lg" weight="bold">
        Episodes ({anime.episodes ?? 0})
      </Text>
      {episodes.data ? (
        <List
          scrollEnabled={false}
          data={episodes.data.pages.flatMap((i) => i) as EpisodeData[]}
          renderItem={({ item }) => (
            <AnimeEpisode episode={item} animeId={anime.mal_id} />
          )}
          contentContainerStyle={styles.episodes}
        />
      ) : episodes.error ? (
        <AnimeFetchError
          message={episodes.error.response?.data.message}
          error="Could not get episodes"
          onReload={episodes.refetch}
        />
      ) : (
        <LoadingView />
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    rowGap: theme.spacing.sm,
  },
  episodes: {
    rowGap: theme.spacing.sm,
  },
}));
