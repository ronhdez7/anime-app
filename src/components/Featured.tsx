import { View, ImageBackground, Dimensions, Pressable } from "react-native";
import { JikanAnimeData } from "@/types/jikan";
import { useJikanQuery } from "@/hooks/use-jikan-query";
import jikan from "@/lib/jikan";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { theme } from "@/theme";
import Text from "./ui/Text";
import Button from "./ui/Button";
import { PlusIcon } from "react-native-heroicons/solid";
import { useRef, useState } from "react";

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
  const [currentIdx, setCurrentIdx] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  return (
    <View>
      <Carousel
        ref={carouselRef}
        loop
        autoPlay
        autoPlayInterval={5000}
        width={Dimensions.get("window").width}
        data={[...items]}
        renderItem={({ item }) => <FeaturedItem item={item} />}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.75,
        }}
        onSnapToItem={setCurrentIdx}
        onScrollBegin={() =>
          setCurrentIdx((v) => carouselRef.current?.getCurrentIndex() ?? v)
        }
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingHorizontal: theme.sizes.padding.sm,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          columnGap: theme.sizes.gap.sm,
        }}
      >
        <Text
          size="sm"
          numberOfLines={1}
          style={{
            flex: 1,
            paddingLeft: theme.sizes.padding.xs,
            paddingVertical: theme.sizes.padding.xs,
          }}
        >
          {items[currentIdx]?.title_english ??
            items[currentIdx]?.title_japanese}
        </Text>

        <Button
          activeOpacity={0.75}
          style={{
            elevation: 10,
            shadowColor: "black",
            borderRadius: 10000,
            paddingHorizontal: theme.sizes.padding.md,
            paddingVertical: theme.sizes.padding.md,
          }}
        >
          <PlusIcon
            size={theme.sizes.icon.sm}
            color={theme.colors.foreground}
          />
        </Button>
      </View>
    </View>
  );
}

interface FeaturedItemProps {
  item: JikanAnimeData;
}
function FeaturedItem({ item }: FeaturedItemProps) {
  return (
    <Pressable
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
        style={{
          height: "100%",
        }}
      />
    </Pressable>
  );
}
