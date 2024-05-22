import { View, Pressable, useWindowDimensions } from "react-native";
import { AnimeData } from "@/types";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { useRef, useState } from "react";
import useFeaturedAnime from "@/queries/use-featured-anime";
import IconButton from "../ui/IconButton";
import AnimeFetchError from "../AnimeFetchError";
import { Link } from "expo-router";
import SkeletonLoader from "../ui/SkeletonLoader";
import { ImageBackground } from "expo-image";

export default function Featured() {
  const { styles } = useStyles(stylesheet);
  const { data, error, refetch, isLoading } = useFeaturedAnime();

  return (
    <View style={styles.featuredContainer}>
      {data || isLoading ? (
        <FeaturedSlider items={data} />
      ) : (
        <AnimeFetchError message={(error as any)?.message} onReload={refetch} />
      )}
    </View>
  );
}

interface FeaturedSliderProps {
  items?: AnimeData[];
}
function FeaturedSlider({ items }: FeaturedSliderProps) {
  const { styles } = useStyles(stylesheet);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { width } = useWindowDimensions();

  const carouselRef = useRef<ICarouselInstance>(null);
  const loading = !items;

  /* for orientation changes */
  // useEffect(() => {
  //   carouselRef.current?.scrollTo({
  //     index: 0,
  //     animated: false,
  //   });
  // }, [width]);

  return (
    <View>
      <View style={styles.carouselContainer}>
        <SkeletonLoader show={loading} height={"100%"}>
          <Carousel
            ref={carouselRef}
            autoPlay
            autoPlayInterval={5000}
            width={width}
            data={!loading ? [...items] : []}
            renderItem={({ item }) => <FeaturedItem item={item} />}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 50,
              parallaxAdjacentItemScale: 0.75,
            }}
            onSnapToItem={setCurrentIdx}
            onProgressChange={() =>
              setCurrentIdx((v) => carouselRef.current?.getCurrentIndex() ?? v)
            }
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
          />
        </SkeletonLoader>
      </View>

      {!loading ? (
        <View style={styles.cardBottom}>
          <Text size="smd" numberOfLines={1} style={styles.cardTitle}>
            {items[currentIdx]?.title}
          </Text>

          <IconButton
            name="plus"
            size={"sm"}
            color={"foreground"}
            style={styles.addButton}
            activeOpacity={0.75}
          />
        </View>
      ) : null}
    </View>
  );
}

interface FeaturedItemProps {
  item: AnimeData;
}
function FeaturedItem({ item }: FeaturedItemProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Link href={`/anime/${item.id}`} asChild>
        <Pressable style={styles.featuredItem}>
          <ImageBackground
            source={{ uri: item?.images.large }}
            contentFit="cover"
            style={{ height: "100%" }}
          />
        </Pressable>
      </Link>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  featuredContainer: {
    aspectRatio: theme.config.imageAspectRatio,
  },
  carouselContainer: {
    overflow: "hidden",
  },
  cardBottom: {
    width: "100%",
    position: "absolute",
    bottom: -23,
    paddingHorizontal: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    columnGap: theme.spacing.sm,
  },
  cardTitle: {
    flex: 1,
    paddingLeft: theme.spacing.sm,
  },
  addButton: {
    elevation: 10,
    shadowColor: theme.colors.shadow,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
  },
  featuredItem: {
    height: "100%",
    overflow: "hidden",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 10, height: 10 },
    elevation: 10,
  },
}));
