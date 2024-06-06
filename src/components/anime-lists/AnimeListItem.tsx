import { AnimeData } from "@/types";
import { TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Link } from "expo-router";
import SkeletonLoader from "../ui/SkeletonLoader";
import { ImageBackground } from "expo-image";
import { Shadow } from "react-native-shadow-2";

interface AnimeListItemProps {
  anime?: AnimeData;
  disabled?: boolean;
}

export function AnimeListItem({ anime, disabled = false }: AnimeListItemProps) {
  const { styles, theme } = useStyles(stylesheet);
  const loading = !anime;

  return (
    <View style={styles.container}>
      <Shadow distance={5} startColor="#06b6d420" style={styles.shadow}>
        <View style={styles.main}>
          <SkeletonLoader
            show={loading}
            height={"100%"}
            radius={theme.radius.md}
          >
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
      </Shadow>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    aspectRatio: theme.config.imageAspectRatio,
  },
  shadow: {
    width: "100%",
    height: "100%",
  },
  main: {
    borderRadius: theme.radius.md,
    width: "100%",
    height: "100%",
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
