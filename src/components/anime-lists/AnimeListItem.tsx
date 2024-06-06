import { AnimeData } from "@/types";
import { TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Link } from "expo-router";
import SkeletonLoader from "../ui/SkeletonLoader";
import { ImageBackground } from "expo-image";

interface AnimeListItemProps {
  anime?: AnimeData;
  disabled?: boolean;
}

export function AnimeListItem({ anime, disabled = false }: AnimeListItemProps) {
  const { styles } = useStyles(stylesheet);
  const loading = !anime;

  return (
    <View style={styles.main}>
      <SkeletonLoader show={loading} height={"100%"}>
        {!loading ? (
          <Link href={`/anime/${anime?.id}`} disabled={disabled} asChild>
            <TouchableOpacity activeOpacity={0.75} disabled={disabled}>
              <ImageBackground
                style={styles.image}
                source={{ uri: anime.images.regular ?? undefined }}
                contentFit="cover"
              >
                <View style={styles.titleContainer}>
                  <Text
                    size="smd"
                    color="foreground"
                    numberOfLines={3}
                    style={styles.title}
                  >
                    {anime?.title}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        ) : null}
      </SkeletonLoader>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    aspectRatio: theme.config.imageAspectRatio,
    borderRadius: theme.radius.md,
    flex: 1,
    overflow: "hidden",
  },
  image: {
    justifyContent: "flex-end",
    height: "100%",
    borderRadius: theme.radius.md,
    overflow: "hidden",
    width: "100%",
  },
  titleContainer: {
    backgroundColor: theme.colors.overlay,
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xs,
  },
  title: { textAlign: "center" },
}));
