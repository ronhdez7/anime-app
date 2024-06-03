import { View } from "react-native";
import React from "react";
import { AnimeData, EpisodeData } from "@/types";
import { useAnimeEpisodes } from "@/queries/use-anime-episodes";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";
import AnimeFetchError from "./AnimeFetchError";
import AnimeEpisode from "./AnimeEpisode";
import { useFindAnime } from "@/queries/use-find-anime";
import { getInfiniteData } from "@/lib/utils";
import { useStreamEpisodes } from "@/queries/use-stream-episodes";
import List from "./ui/List";

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
          // scrollEnabled={false}
          data={getInfiniteData(episodes.data) as EpisodeData[]}
          renderItem={({ item }) => (
            <AnimeEpisode episode={item} animeId={anime.id} />
          )}
          estimatedItemSize={55}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    flex: 1,
  },
  episodes: {
    rowGap: theme.spacing.xs,
  },
  separator: { height: theme.spacing.xs },
}));
