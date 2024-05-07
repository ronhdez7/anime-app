import { View } from "react-native";
import React from "react";
import { AnimeData, EpisodeData } from "@/types";
import { useAnimeEpisodes } from "@/queries/use-anime-episodes";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";
import List from "./ui/List";
import AnimeFetchError from "./AnimeFetchError";
import LoadingView from "./ui/LoadingView";
import AnimeEpisode from "./AnimeEpisode";
import { useFindAnime } from "@/queries/use-find-anime";

interface Props {
  anime: AnimeData;
}

export default function AnimeEpisodes({ anime }: Props) {
  const { styles } = useStyles(stylesheet);

  const episodes = useAnimeEpisodes(anime.id);

  const animeStream = useFindAnime({
    title: anime.titles.jp,
    title_en: anime.titles.en,
  });
  useAnimeEpisodes(animeStream.data?.url);

  return (
    <View style={styles.main}>
      <Text size="lg" weight="bold">
        Episodes ({anime.episodeCount})
      </Text>
      {episodes.data ? (
        <List
          scrollEnabled={false}
          data={episodes.data.pages.flatMap((i) => i) as EpisodeData[]}
          renderItem={({ item }) => (
            <AnimeEpisode episode={item} animeId={anime.id} />
          )}
          contentContainerStyle={styles.episodes}
        />
      ) : episodes.error ? (
        <AnimeFetchError
          message={episodes.error.message}
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
    rowGap: theme.spacing.xs,
  },
  episodes: {
    rowGap: theme.spacing.sm,
  },
}));
