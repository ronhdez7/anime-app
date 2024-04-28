import React from "react";
import AnimeFetchError from "./AnimeFetchError";
import LoadingView from "./ui/LoadingView";
import { useAnime } from "@/queries/jikan/use-anime";
import { MALID } from "@/types/jikan";
import { useAnimeEpisodes } from "@/queries/jikan/use-anime-episodes";

interface AnimeScreenProps {
  id: MALID;
}

export default function AnimeScreen({ id }: AnimeScreenProps) {
  // initial data should be populated if it was shown as item
  const { data, error, refetch } = useAnime(id);
  useAnimeEpisodes(id);

  if (data) {
    // return <AnimeScreen anime={data} />;
    return <></>;
  } else if (error) {
    <AnimeFetchError
      onReload={refetch}
      message={error.response?.data?.message}
    />;
  }

  return <LoadingView />;
}
