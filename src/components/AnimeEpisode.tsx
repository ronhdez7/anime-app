import { TouchableOpacity, View } from "react-native";
import React from "react";
import { EpisodeData } from "@/types";
import Text from "./ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { MALID } from "@/types/jikan";
import { Link } from "expo-router";
import SkeletonLoader from "./ui/SkeletonLoader";

interface Props {
  episode?: EpisodeData;
  animeId?: MALID;
}

export default function AnimeEpisode({ episode, animeId }: Props) {
  const { styles } = useStyles(stylesheet);

  const loading = !episode;

  return (
    <View style={styles.container}>
      <SkeletonLoader show={loading}>
        {!loading ? (
          <Link href={`/watch/${animeId}/${episode.id}`} asChild>
            <TouchableOpacity>
              <View style={styles.main}>
                <View>
                  <Text numberOfLines={1}>{episode.title}</Text>
                </View>
                {episode.filler && (
                  <View style={styles.filler}>
                    <Text size="smd" color="foreground">
                      Filler
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Link>
        ) : (
          <View style={{ height: 56 }} />
        )}
      </SkeletonLoader>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },
  main: {
    backgroundColor: theme.colors.neutral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
  },
  filler: {
    position: "absolute",
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.radius.xs,
  },
}));
