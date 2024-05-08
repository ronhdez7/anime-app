import {
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  LayoutRectangle,
} from "react-native";
import { AnimeData } from "@/types";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { useRef, useState } from "react";
import LoadingView from "../ui/LoadingView";
import useFeaturedAnime from "@/queries/use-featured-anime";
import IconButton from "../ui/IconButton";
import AnimeFetchError from "../AnimeFetchError";
import { Link } from "expo-router";

export default function Featured() {
  const { styles } = useStyles(stylesheet);
  const { data, error, refetch } = useFeaturedAnime();

  if (data) {
    return <FeaturedSlider items={data} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <AnimeFetchError
            message={error.message}
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
  const { styles } = useStyles(stylesheet);
  const [currentIdx, setCurrentIdx] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const [layout, setLayout] = useState<LayoutRectangle>();

  console.log(layout);

  return (
    <View onLayout={(e) => setLayout(e.nativeEvent.layout)}>
      <View style={{ aspectRatio: 17 / 24 }}>
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
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.75,
          }}
          onSnapToItem={setCurrentIdx}
          onScrollBegin={() =>
            setCurrentIdx((v) => carouselRef.current?.getCurrentIndex() ?? v)
          }
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
      </View>

      <View style={{ height: 23 }}>
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
      </View>
    </View>
  );
}

interface FeaturedItemProps {
  item: AnimeData;
}
function FeaturedItem({ item }: FeaturedItemProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <Link href={`/anime/${item.id}`} asChild>
      <Pressable style={styles.featuredItem}>
        <ImageBackground
          source={{
            uri: item?.images.large,
          }}
          resizeMode="cover"
          style={{ height: "100%" }}
        />
      </Pressable>
    </Link>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  errorContainer: {
    aspectRatio: 17 / 24,
    alignItems: "center",
    justifyContent: "center",
  },
  errorCard: {
    height: "100%",
    width: "100%",
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottom: {
    width: "100%",
    position: "absolute",
    bottom: 0,
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
