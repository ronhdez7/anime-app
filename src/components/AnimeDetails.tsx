import { Image, ImageBackground, ScrollView, View } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./ui/Text";
import { AnimeData } from "@/types";
import { useFindAnime } from "@/queries/use-find-anime";
import SkeletonLoader from "./ui/SkeletonLoader";
import { Skeleton } from "moti/skeleton";

interface AnimeDetailsProps {
  anime?: AnimeData;
}

export default function AnimeDetails({ anime }: AnimeDetailsProps) {
  const { styles } = useStyles(stylesheet);

  useFindAnime(
    {
      title: anime?.titles.jp,
      title_en: anime?.titles.en,
    },
    !!anime
  );

  const loading = !anime;

  const title = anime?.title;
  const year = anime?.dates.from.year;
  const rating = anime?.rating;
  const episodeCount = anime?.episodeCount;
  const description = anime?.description;

  return (
    <View>
      <Skeleton.Group show={loading}>
        {/* Trailer */}
        <View style={styles.trailer}>
          <View style={{ flex: 1 }}>
            <SkeletonLoader height={"100%"}>
              {!loading ? (
                anime.trailer.images.large_image_url ? (
                  <Image
                    style={styles.image}
                    source={{ uri: anime.trailer.images.large_image_url }}
                  />
                ) : (
                  <ImageBackground
                    source={{ uri: anime.images.large }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )
              ) : null}
            </SkeletonLoader>
          </View>
        </View>

        <View style={styles.main}>
          {/* Title */}
          <SkeletonLoader width={"90%"}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text weight="bold" size="xl">
                {title}
              </Text>
            </ScrollView>
          </SkeletonLoader>

          {/* Quick Details */}
          <SkeletonLoader width={"75%"}>
            {!loading ? (
              <View style={styles.quickInfo}>
                {year && <Text size="sm">{year}</Text>}
                {rating && <Text size="sm">{rating}</Text>}
                {episodeCount !== undefined && (
                  <Text size="sm">{episodeCount} episodes</Text>
                )}
              </View>
            ) : (
              <View style={{ height: 20 }} />
            )}
          </SkeletonLoader>

          {/* Description */}
          <SkeletonLoader>
            {!loading ? (
              <Text size="smd" numberOfLines={4} style={styles.description}>
                {description}
              </Text>
            ) : (
              <View style={{ height: 96 }} />
            )}
          </SkeletonLoader>
        </View>
      </Skeleton.Group>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    rowGap: theme.spacing.xs,
  },
  trailer: {
    width: "100%",
    aspectRatio: 16 / 9,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  quickInfo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.lg,
  },
  description: {
    paddingTop: theme.spacing.xs,
    lineHeight: 20,
  },
}));
