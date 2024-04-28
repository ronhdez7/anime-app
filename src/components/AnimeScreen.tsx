import React from "react";
import AnimeFetchError from "./AnimeFetchError";
import LoadingView from "./ui/LoadingView";
import { useAnime } from "@/queries/jikan/use-anime";
import { MALID } from "@/types/jikan";
import { useAnimeEpisodes } from "@/queries/jikan/use-anime-episodes";
import AnimeDetails from "./AnimeDetails";
import { Dimensions, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackArrow from "./ui/BackArrow";

interface AnimeScreenProps {
  id: MALID;
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = (WIDTH / 17) * 24;

export default function AnimeScreen({ id }: AnimeScreenProps) {
  const { styles } = useStyles(stylesheet);

  // initial data should be populated if it was shown as item
  const { data, error, refetch } = useAnime(id);
  useAnimeEpisodes(id);

  const insets = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEIGHT, 0, HEIGHT],
            [-HEIGHT / 2, 0, HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEIGHT, 0, HEIGHT],
            [1.25, 1, 1.25]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, HEIGHT / 2, HEIGHT / 1.25],
        [0, 0, 1]
      ),
    };
  });

  if (data) {
    return (
      <View style={styles.main}>
        {/* Header */}
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            header() {
              return (
                <View>
                  <Animated.View
                    style={[styles.headerBackground, headerAnimatedStyle]}
                  />
                  <View
                    style={[{ paddingTop: insets.top }, styles.headerContainer]}
                  >
                    <View style={styles.headerLeft}>
                      <BackArrow color="foreground" />
                    </View>
                  </View>
                </View>
              );
            },
          }}
        />
        {/* END Heder */}

        <Animated.ScrollView
          ref={scrollRef}
          style={[styles.scroll]}
          scrollEventThrottle={16}
        >
          <Animated.Image
            source={{ uri: data.images.webp.large_image_url }}
            style={[styles.image, imageAnimatedStyle]}
          />
          <AnimeDetails anime={data} />
        </Animated.ScrollView>
      </View>
    );
  } else if (error) {
    <AnimeFetchError
      onReload={refetch}
      message={error.response?.data?.message}
    />;
  }

  return <LoadingView />;
}

const stylesheet = createStyleSheet((theme) => ({
  image: {
    width: "100%",
    aspectRatio: 17 / 24,
  },
  scroll: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  headerBackground: {
    backgroundColor: theme.colors.background,
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.xs,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.xs,
  },
}));
