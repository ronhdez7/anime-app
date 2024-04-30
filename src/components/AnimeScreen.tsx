import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { MALID } from "@/types/jikan";
import { useAnime } from "@/queries/jikan/use-anime";
import { useAnimeEpisodes } from "@/queries/jikan/use-anime-episodes";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import AnimeFetchError from "./AnimeFetchError";
import LoadingView from "./ui/LoadingView";
import AnimeDetails from "./AnimeDetails";

interface AnimeScreenProps {
  id: MALID;
}
export default function AnimeScreen({ id }: AnimeScreenProps) {
  const { styles } = useStyles(stylesheet);

  const anime = useAnime(id);
  useAnimeEpisodes(id);

  if (anime.data) {
    return (
      <ScrollView>
        <View style={styles.trailer}>
          {anime.data.trailer.images.large_image_url && (
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{ uri: anime.data.trailer.images.large_image_url }}
            />
          )}
        </View>
        <AnimeDetails anime={anime.data} />
      </ScrollView>
    );
  } else if (anime.error) {
    return (
      <AnimeFetchError
        message={anime.error.response?.data.message}
        onReload={anime.refetch}
      />
    );
  }

  return <LoadingView />;
}

const stylesheet = createStyleSheet((theme) => ({
  trailer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
}));
