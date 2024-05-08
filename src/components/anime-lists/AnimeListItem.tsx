import { AnimeData } from "@/types";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Link } from "expo-router";

interface AnimeListItemProps {
  anime: AnimeData;
  disabled?: boolean;
}

export function AnimeListItem({ anime, disabled = false }: AnimeListItemProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <Link href={`/anime/${anime.id}`} disabled={disabled} asChild>
      <TouchableOpacity style={styles.main} activeOpacity={0.75}>
        <ImageBackground
          style={styles.image}
          source={{ uri: anime.images.regular }}
          resizeMode="cover"
        >
          <View style={styles.titleContainer}>
            <Text
              size="smd"
              color="foreground"
              numberOfLines={3}
              style={styles.title}
            >
              {anime.title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
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
