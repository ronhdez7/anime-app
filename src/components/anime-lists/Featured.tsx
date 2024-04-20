import { View, ImageBackground, Dimensions, Pressable } from "react-native";
import { JikanAnimeData } from "@/types/jikan";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { theme } from "@/theme";
import Text from "../ui/Text";
import Button from "../ui/Button";
import { PlusIcon } from "react-native-heroicons/solid";
import { useRef, useState } from "react";
import { AnimeFetchError } from "./AnimeList";
import LoadingView from "../ui/LoadingView";
import useFeaturedAnime from "@/queries/jikan/use-featured-anime";

export default function Featured() {
  const { data, error, refetch } = useFeaturedAnime();

  if (data) {
    return <FeaturedSlider items={data} />;
  }

  if (error) {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            transform: [{ scale: 0.9 }],
            height: "100%",
            width: "100%",
            borderRadius: theme.sizes.radius.md,
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimeFetchError
            message={error.response?.data.message}
            onReload={refetch}
          />
        </View>
      </View>
    );
  }

  return <LoadingView />;
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
            shadowColor: theme.colors.shadow,
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
        borderRadius: theme.sizes.radius.md,
        overflow: "hidden",
        shadowColor: theme.colors.shadow,
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
