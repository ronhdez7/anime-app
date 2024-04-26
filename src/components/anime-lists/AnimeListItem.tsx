import { AnimeData } from "@/types";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface AnimeListItemProps {
  anime: AnimeData;
}

export function AnimeListItem({ anime }: AnimeListItemProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity style={styles.main} activeOpacity={0.75}>
      <ImageBackground
        style={styles.image}
        source={{ uri: anime.images.webp.image_url }}
        resizeMode="cover"
      >
        <View style={styles.titleContainer}>
          <Text
            size="xs"
            color="foreground"
            numberOfLines={3}
            style={styles.title}
          >
            {anime.title_english ?? anime.title_japanese}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    aspectRatio: 17 / 24,
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
