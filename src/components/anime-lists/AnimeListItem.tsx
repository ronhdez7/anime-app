import { AnimeData } from "@/types";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { theme } from "@/styles/theme";

interface AnimeListItemProps {
  anime: AnimeData;
}

export function AnimeListItem({ anime }: AnimeListItemProps) {
  return (
    <TouchableOpacity
      style={{
        aspectRatio: 17 / 24,
        borderRadius: theme.sizes.radius.md,
        flex: 1,
        overflow: "hidden",
      }}
      activeOpacity={0.75}
    >
      <ImageBackground
        style={{ justifyContent: "flex-end", height: "100%" }}
        source={{ uri: anime.images.webp.image_url }}
        resizeMode="cover"
        borderRadius={theme.sizes.radius.md}
      >
        <View
          style={{
            backgroundColor: theme.colors.overlay,
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.sizes.padding.xs,
          }}
        >
          <Text
            size="xs"
            foreground
            numberOfLines={3}
            style={{ textAlign: "center" }}
          >
            {anime.title_english ?? anime.title_japanese}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
