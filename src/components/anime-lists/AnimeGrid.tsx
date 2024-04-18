import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useMemo } from "react";
import {
  AnimeFetchError,
  AnimeListItem,
  AnimeListProps,
  getInfiniteData,
} from "./AnimeList";
import { theme } from "@/theme";
import LoadingView from "../LoadingView";

interface AnimeGridProps extends AnimeListProps {}

export default function AnimeGrid({ query }: AnimeGridProps) {
  const items = useMemo(() => getInfiniteData(query.data), [query.data]);

  if (query.data) {
    return (
      <View style={{ paddingHorizontal: theme.sizes.padding.sm, flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={items}
          numColumns={3}
          columnWrapperStyle={{ columnGap: theme.sizes.padding.sm }}
          contentContainerStyle={{
            rowGap: theme.sizes.padding.sm,
            paddingBottom: theme.sizes.padding.sm,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1 / 3,
                aspectRatio: 17 / 24,
                alignItems: "center",
              }}
            >
              <AnimeListItem anime={item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  if (query.error) {
    return (
      <AnimeFetchError
        message={query.error.response?.data.message}
        onReload={query.refetch}
      />
    );
  }

  return <LoadingView color="foreground" />;
}
