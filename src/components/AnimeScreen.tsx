import { ScrollView } from "react-native";
import React from "react";
import { useAnime } from "@/queries/use-anime";
import { useAnimeEpisodes } from "@/queries/use-anime-episodes";
import AnimeFetchError from "./AnimeFetchError";
import AnimeDetails from "./AnimeDetails";
import AnimeEpisodes from "./AnimeEpisodes";
import { ID } from "@/types";

interface AnimeScreenProps {
  id: ID;
}
export default function AnimeScreen({ id }: AnimeScreenProps) {
  const anime = useAnime(id);
  useAnimeEpisodes(id);

  return anime.data || anime.isLoading ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{ flex: 1 }}
    >
      <AnimeDetails anime={anime.data ?? undefined} />
      {anime.data && <AnimeEpisodes anime={anime.data} />}
    </ScrollView>
  ) : (
    <AnimeFetchError message={anime.error?.message} onReload={anime.refetch} />
  );
}
