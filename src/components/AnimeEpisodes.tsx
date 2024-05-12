import { View } from "react-native";
import React from "react";
import { AnimeData, EpisodeData } from "@/types";
import { useAnimeEpisodes } from "@/queries/use-anime-episodes";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";
import List from "./ui/List";
import AnimeFetchError from "./AnimeFetchError";
import AnimeEpisode from "./AnimeEpisode";
import { useFindAnime } from "@/queries/use-find-anime";
import { getInfiniteData } from "./anime-lists/AnimeList";
import { useStreamEpisodes } from "@/queries/use-stream-episodes";

interface Props {
  anime: AnimeData;
}

export default function AnimeEpisodes({ anime }: Props) {
  const { styles } = useStyles(stylesheet);

  const episodes = useAnimeEpisodes(anime.id);

  const animeStream = useFindAnime(
    {
      title: anime.titles.jp,
      title_en: anime.titles.en,
    },
    !!anime
  );
  useStreamEpisodes(animeStream.data?.url);

  const episodeCount = getInfiniteData(episodes.data).filter(Boolean).length;

  return (
    <View style={styles.main}>
      <Text size="lg" weight="bold">
        Episodes {episodes.data ? `(${episodeCount || "none"})` : null}
      </Text>
      {episodes.data || episodes.isLoading ? (
        <List
          scrollEnabled={false}
          data={getInfiniteData(episodes.data) as EpisodeData[]}
          renderItem={({ item }) => (
            <AnimeEpisode episode={item} animeId={anime.id} />
          )}
          contentContainerStyle={styles.episodes}
        />
      ) : (
        <AnimeFetchError
          message={episodes.error?.message}
          error="Could not get episodes"
          onReload={episodes.refetch}
        />
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
    rowGap: theme.spacing.xs,
  },
}));
