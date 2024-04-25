import { View, FlatList, RefreshControl, FlatListProps } from "react-native";
import { AnimeFetchError, NoAnimeFound, getInfiniteData } from "./AnimeList";
import { theme } from "@/styles/theme";
import LoadingView from "../ui/LoadingView";
import { useState } from "react";
import { AnimeListItem } from "./AnimeListItem";
import { AnimeData, AnimeDataQueryResult } from "@/types";

const COLS = 3;

export interface AnimeGridProps extends Partial<FlatListProps<AnimeData>> {
  data: AnimeData[];
  onRefresh?: () => void;
}
export default function AnimeGrid({
  data,
  onRefresh,
  ...props
}: AnimeGridProps) {
  const [refreshing, setRefreshing] = useState(false);
  const items: AnimeData[] = {
    ...data,
    length: Math.ceil(data.length / COLS) * COLS,
  };

  function refresh() {
    setRefreshing(true);
    onRefresh?.();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  return (
    <FlatList
      data={items}
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
            flexDirection: "row",
          }}
        >
          {item && <AnimeListItem anime={item} />}
        </View>
      )}
      keyExtractor={(item, index) => item?.title ?? index.toString()}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={2}
      ListFooterComponent={() => <LoadingView color={"foreground"} />}
      refreshControl={
        onRefresh && (
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        )
      }
      keyboardShouldPersistTaps="never"
      keyboardDismissMode="on-drag"
      ListEmptyComponent={NoAnimeFound}
      {...props}
    />
  );
}

interface AnimeGridViewProps {
  query: AnimeDataQueryResult;
  onRefresh?: () => void;
}
export function AnimeGridView({ query, onRefresh }: AnimeGridViewProps) {
  return (
    <View style={{ paddingHorizontal: theme.sizes.padding.sm, flex: 1 }}>
      {query.data ? (
        <AnimeGrid
          data={getInfiniteData(query.data)}
          onEndReached={() => {
            if (
              "fetchNextPage" in query &&
              !query.isFetching &&
              query.hasNextPage
            ) {
              query.fetchNextPage();
            }
          }}
          ListFooterComponentStyle={{
            display:
              "isFetchingNextPage" in query && query.isFetchingNextPage
                ? undefined
                : "none",
          }}
          ListFooterComponent={() => <LoadingView color="foreground" />}
          onRefresh={onRefresh}
        />
      ) : query.error ? (
        <AnimeFetchError
          message={query.error.response?.data.message}
          onReload={query.refetch}
        />
      ) : (
        <LoadingView color="foreground" />
      )}
    </View>
  );
}
