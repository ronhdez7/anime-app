import { TouchableOpacity, View } from "react-native";
import React from "react";
import { EpisodeData, ID } from "@/types";
import Text from "./ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Link } from "expo-router";
import SkeletonLoader from "./ui/SkeletonLoader";
import { Shadow } from "react-native-shadow-2";

interface Props {
  episode?: EpisodeData;
  animeId: ID | null;
}

export default function AnimeEpisode({ episode, animeId }: Props) {
  const { styles } = useStyles(stylesheet);

  const loading = !episode;

  return (
    <View>
      <Shadow distance={5}>
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
      </Shadow>
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
