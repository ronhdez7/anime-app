import { View } from "react-native";
import React from "react";
import { AnimeData } from "@/types";
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
      title: anime.titles.jp ?? undefined,
      title_en: anime.titles.en ?? undefined,
    },
    !!anime
  );
  useStreamEpisodes(animeStream.data?.url);

  const data = getInfiniteData(episodes.data);
  const episodeCount = data.filter(Boolean).length;

  return (
    <View style={styles.main}>
      <View style={styles.listHeader}>
        <Text size="lg" weight="bold">
          Episodes {episodes.data ? `(${episodeCount || "none"})` : null}
        </Text>
      </View>
      {episodes.data || episodes.isLoading ? (
        <List
          data={data}
          renderItem={({ item }) => (
            <AnimeEpisode episode={item} animeId={anime.id} />
          )}
          estimatedItemSize={55}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
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
    rowGap: theme.spacing.xs,
    flex: 1,
  },
  listHeader: {
    paddingHorizontal: theme.spacing.sm,
  },
  listContent: {
    padding: theme.spacing.sm,
  },
  separator: { height: theme.spacing.sm },
}));
