import { View, ScrollView, Image, ImageBackground } from "react-native";
import React from "react";
import { MALID } from "@/types/jikan";
import { useAnime } from "@/queries/jikan/use-anime";
import { useAnimeEpisodes } from "@/queries/jikan/use-anime-episodes";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import AnimeFetchError from "./AnimeFetchError";
import LoadingView from "./ui/LoadingView";
import AnimeDetails from "./AnimeDetails";
import AnimeEpisodes from "./AnimeEpisodes";
import Button from "./ui/Button";
import Text from "./ui/Text";
import IconButton from "./ui/IconButton";
import { Link } from "expo-router";

interface AnimeScreenProps {
  id: MALID;
}
export default function AnimeScreen({ id }: AnimeScreenProps) {
  const { styles } = useStyles(stylesheet);

  const anime = useAnime(id);
  useAnimeEpisodes(id);

  if (anime.data) {
    return (
      <>
        <ScrollView>
          <View style={styles.trailer}>
            {anime.data.trailer.images.large_image_url ? (
              <Image
                style={styles.image}
                source={{ uri: anime.data.trailer.images.large_image_url }}
              />
            ) : (
              <ImageBackground
                source={{ uri: anime.data.images.webp.large_image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </View>
          <AnimeDetails anime={anime.data} />
          <AnimeEpisodes anime={anime.data} />
        </ScrollView>
        <View style={styles.bottomNav}>
          <Link href={`/watch/${anime.data.mal_id}`} asChild>
            <Button style={styles.playButton}>
              <Text color="foreground" style={styles.watchText}>
                Watch
              </Text>
            </Button>
          </Link>
          <IconButton name="plus" color="primary" style={styles.saveButton} />
        </View>
      </>
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
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    columnGap: theme.spacing.sm,
  },
  playButton: {
    flex: 1,
    height: "100%",
  },
  watchText: {
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: theme.colors.neutral,
    borderRadius: theme.radius.md,
  },
  image: {
    height: "100%",
    width: "100%",
  },
}));
