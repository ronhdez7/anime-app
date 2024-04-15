import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { JikanAnimeData } from "@/types/jikan";
import { useJikanQuery } from "@/hooks/use-jikan-query";
import jikan from "@/lib/jikan";
import Carousel from "react-native-reanimated-carousel";
import { theme } from "@/theme";
import Text from "./ui/Text";

export default function Featured() {
  const { data } = useJikanQuery({
    queryKey: ["anime", "top"],
    queryFn: ({ signal }) => jikan.getTopAnime({ signal }),
  });

  if (!data) return null;

  return <FeaturedSlider items={data} />;
}

interface FeaturedSliderProps {
  items: JikanAnimeData[];
}
function FeaturedSlider({ items }: FeaturedSliderProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={5000}
        width={Dimensions.get("window").width}
        data={[...items]}
        renderItem={({ item }) => {
          return <FeaturedItem item={item} />;
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.75,
        }}
      />
    </View>
  );
}

interface FeaturedItemProps {
  item: JikanAnimeData;
}
function FeaturedItem({ item }: FeaturedItemProps) {
  return (
    <View
      style={{
        height: "100%",
        aspectRatio: 17 / 24,
        borderRadius: theme.sizes.radius.md,
        overflow: "hidden",
        shadowColor: "black",
        shadowOffset: { width: 10, height: 10 },
        elevation: 10,
      }}
    >
      <ImageBackground
        source={{
          uri: item?.images.webp.large_image_url,
        }}
        resizeMode="cover"
        style={{ height: "100%", alignItems: "center" }}
      >
        <PlayButton />
      </ImageBackground>
    </View>
  );
}

function PlayButton() {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 50,
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.sizes.padding.sm,
        paddingHorizontal: theme.sizes.padding.xl,
        borderRadius: theme.sizes.radius.md,
      }}
    >
      <Text foreground>Play</Text>
    </TouchableOpacity>
  );
}
