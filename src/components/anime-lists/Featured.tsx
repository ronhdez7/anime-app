import {
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import { AnimeData } from "@/types";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { theme } from "@/styles/theme";
import Text from "../ui/Text";
import { useRef, useState } from "react";
import LoadingView from "../ui/LoadingView";
import useFeaturedAnime from "@/queries/jikan/use-featured-anime";
import IconButton from "../ui/IconButton";
import AnimeFetchError from "../AnimeFetchError";

export default function Featured() {
  const styles = stylesheet;
  const { data, error, refetch } = useFeaturedAnime();

  if (data) {
    return <FeaturedSlider items={data} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <AnimeFetchError
            message={error.response?.data.message}
            onReload={refetch}
            foreground
          />
        </View>
      </View>
    );
  }

  return <LoadingView />;
}

interface FeaturedSliderProps {
  items: AnimeData[];
}
function FeaturedSlider({ items }: FeaturedSliderProps) {
  const styles = stylesheet;
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

      <View style={styles.cardBottom}>
        <Text size="sm" numberOfLines={1} style={styles.cardTitle}>
          {items[currentIdx]?.title_english ??
            items[currentIdx]?.title ??
            items[currentIdx]?.title_japanese}
        </Text>

        <IconButton
          name="plus"
          size={theme.sizes.icon.sm}
          color={theme.colors.foreground}
          style={styles.addButton}
          activeOpacity={0.75}
        />
      </View>
    </View>
  );
}

interface FeaturedItemProps {
  item: AnimeData;
}
function FeaturedItem({ item }: FeaturedItemProps) {
  const styles = stylesheet;

  return (
    <Pressable style={styles.featuredItem}>
      <ImageBackground
        source={{
          uri: item?.images.webp.large_image_url,
        }}
        resizeMode="cover"
        style={{ height: "100%" }}
      />
    </Pressable>
  );
}

const stylesheet = StyleSheet.create({
  errorContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  errorCard: {
    transform: [{ scale: 0.9 }],
    height: "100%",
    width: "100%",
    borderRadius: theme.sizes.radius.md,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottom: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: theme.sizes.padding.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    columnGap: theme.sizes.gap.sm,
  },
  cardTitle: {
    flex: 1,
    paddingLeft: theme.sizes.padding.xs,
    paddingVertical: theme.sizes.padding.xs,
  },
  addButton: {
    elevation: 10,
    shadowColor: theme.colors.shadow,
    backgroundColor: theme.colors.primary,
    padding: theme.sizes.padding.md,
  },
  featuredItem: {
    height: "100%",
    borderRadius: theme.sizes.radius.md,
    overflow: "hidden",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 10, height: 10 },
    elevation: 10,
  },
});
