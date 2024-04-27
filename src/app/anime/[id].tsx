import React from "react";
import { useLocalSearchParams } from "expo-router";
import AnimeScreen from "@/components/AnimeScreen";
import { useAnime } from "@/queries/jikan/use-anime";
import AnimeFetchError from "@/components/AnimeFetchError";
import LoadingView from "@/components/ui/LoadingView";

type Params = {
  id: string;
};

export default function AnimePage() {
  const { id } = useLocalSearchParams<Params>();

  const { data, error, refetch } = useAnime(id);

  if (data) {
    return <AnimeScreen anime={data} />;
  } else if (error) {
    <AnimeFetchError
      onReload={refetch}
      message={error.response?.data?.message}
    />;
  }

  return <LoadingView />;
}
