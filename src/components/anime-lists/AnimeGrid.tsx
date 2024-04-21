import { View, FlatList, RefreshControl } from "react-native";
import {
  AnimeFetchError,
  AnimeListItem,
  AnimeListProps,
  getInfiniteData,
} from "./AnimeList";
import { theme } from "@/theme";
import LoadingView from "../ui/LoadingView";
import { useState } from "react";
import Text from "../ui/Text";

interface AnimeGridProps extends AnimeListProps {
  onRefresh: () => void;
}

const COLS = 3;

export default function AnimeGrid({ query, onRefresh }: AnimeGridProps) {
  const [refreshing, setRefreshing] = useState(false);
  const items = getInfiniteData(query.data);

  function refresh() {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  if (query.data) {
    return (
      <View style={{ paddingHorizontal: theme.sizes.padding.sm, flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={{ ...items, length: Math.ceil(items.length / COLS) * 3 }}
          numColumns={COLS}
          columnWrapperStyle={{ columnGap: theme.sizes.padding.sm }}
          contentContainerStyle={{
            rowGap: theme.sizes.padding.sm,
            paddingBottom: theme.sizes.padding.sm,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1 / COLS,
                aspectRatio: 17 / 24,
                alignItems: "center",
              }}
            >
              {item && <AnimeListItem anime={item} />}
            </View>
          )}
          keyExtractor={(item, index) => item?.title ?? index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (
              "fetchNextPage" in query &&
              !query.isFetching &&
              query.hasNextPage
            ) {
              query.fetchNextPage();
            }
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={() => <LoadingView color={"foreground"} />}
          ListFooterComponentStyle={{
            display:
              "isFetchingNextPage" in query && query.isFetchingNextPage
                ? undefined
                : "none",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          keyboardShouldPersistTaps="never"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center" }}>
              <Text>No anime found</Text>
            </View>
          )}
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
