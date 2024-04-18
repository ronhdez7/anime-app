import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { PropsWithChildren, useMemo } from "react";
import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { JikanAnimeData, JikanError } from "@/types/jikan";
import { theme } from "@/theme";
import Text from "@/components/ui/Text";
import ReloadButton from "../ReloadButton";
import LoadingView from "../LoadingView";

export interface AnimeListProps {
  query:
    | UseQueryResult<JikanAnimeData[], AxiosError<JikanError>>
    | UseInfiniteQueryResult<
        {
          pages: JikanAnimeData[][];
          pageParams: number[];
        },
        AxiosError<JikanError>
      >;
}

export default function AnimeList({ query }: AnimeListProps) {
  const items = useMemo(() => getInfiniteData(query.data), [query.data]);

  function refetch() {
    query.refetch();
  }

  return (
    <View
      style={{
        height: 180,
        borderRadius: theme.sizes.radius.md,
        backgroundColor: theme.colors.secondary,
        overflow: "hidden",
      }}
    >
      {query.data ? (
        <FlatList
          data={items}
          renderItem={({ item }) => <AnimeListItem anime={item} />}
          horizontal
          contentContainerStyle={{ padding: theme.sizes.padding.sm }}
          keyExtractor={(item, index) => item?.title ?? index.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ width: theme.sizes.padding.sm }} />
          )}
          onEndReached={() => {
            if (
              "fetchNextPage" in query &&
              !query.isFetching &&
              query.hasNextPage
            ) {
              query.fetchNextPage();
            }
          }}
          onEndReachedThreshold={2}
          ListFooterComponent={() => (
            <ActivityIndicator
              size={theme.sizes.icon.md}
              color={theme.colors.foreground}
            />
          )}
          ListFooterComponentStyle={{
            paddingLeft: theme.sizes.padding.xs,
            height: "100%",
            justifyContent: "center",
            display:
              "isFetchingNextPage" in query && query.isFetchingNextPage
                ? undefined
                : "none",
          }}
        />
      ) : query.error ? (
        <AnimeFetchError
          message={query.error.response?.data.message}
          onReload={refetch}
        />
      ) : (
        <LoadingView color='foreground' />
      )}
    </View>
  );
}

interface AnimeListItemProps {
  anime: JikanAnimeData;
}

export function AnimeListItem({ anime }: AnimeListItemProps) {
  return (
    <TouchableOpacity style={styles.listItem} activeOpacity={0.75}>
      <ImageBackground
        style={{ justifyContent: "flex-end", height: "100%" }}
        source={{ uri: anime.images.webp.image_url }}
        resizeMode="cover"
        borderRadius={theme.sizes.radius.md}
      >
        <View
          style={{
            backgroundColor: theme.colors.overlay,
            height: "25%",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.sizes.padding.xs,
          }}
        >
          <Text
            size="sm"
            foreground
            numberOfLines={2}
            style={{ textAlign: "center" }}
          >
            {anime.title_english ?? anime.title_japanese}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    aspectRatio: 17 / 24,
    borderRadius: theme.sizes.radius.md,
    height: "100%",
    overflow: "hidden",
  },
});

interface ListHeaderProps {
  title: string;
}
export function AnimeListHeader({
  title,
  children,
}: PropsWithChildren<ListHeaderProps>) {
  return (
    <View style={{ rowGap: theme.sizes.gap.xs }}>
      <Text
        style={{
          paddingLeft: theme.sizes.padding.sm,
          fontFamily: theme.fonts.inter.bold,
        }}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}

interface AnimeFetchErrorProps {
  message?: string;
  onReload?: () => void;
}
export function AnimeFetchError({ message, onReload }: AnimeFetchErrorProps) {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        rowGap: theme.sizes.gap.xl,
      }}
    >
      <View
        style={{
          alignItems: "center",
          rowGap: theme.sizes.gap.sm,
        }}
      >
        <Text foreground>Could not get anime</Text>
        {message && (
          <Text size="sm" foreground>
            Error: {message}
          </Text>
        )}
      </View>
      {onReload && <ReloadButton onReload={onReload} />}
    </View>
  );
}

export function getInfiniteData(
  data?: JikanAnimeData[] | { pages: JikanAnimeData[][] }
): JikanAnimeData[] {
  return (
    (Array.isArray(data) ? data : data?.pages.flatMap((page) => page)) ?? []
  );
}
