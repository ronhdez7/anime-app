import { View, RefreshControl, StyleSheet } from "react-native";
import { NoAnimeFound, getInfiniteData } from "./AnimeList";
import { theme } from "@/styles/theme";
import LoadingView from "../ui/LoadingView";
import { useState } from "react";
import { AnimeListItem } from "./AnimeListItem";
import { AnimeData, AnimeDataQueryResult } from "@/types";
import List, { ListProps } from "@/components/ui/List";
import AnimeFetchError from "../AnimeFetchError";

const COLS = 3;

export interface AnimeGridProps extends Partial<ListProps<AnimeData>> {
  data: AnimeData[];
  onRefresh?: () => void;
}
export default function AnimeGrid({
  data,
  onRefresh,
  ...props
}: AnimeGridProps) {
  const styles = stylesheet;

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
    <List
      data={items}
      numColumns={COLS}
      columnWrapperStyle={styles.listColumn}
      contentContainerStyle={styles.listContainer}
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
      ListFooterComponent={() => <LoadingView color={"foreground"} />}
      refreshControl={
        onRefresh && (
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        )
      }
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
  const styles = stylesheet;
  return (
    <View style={styles.main}>
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
        <LoadingView />
      )}
    </View>
  );
}

const stylesheet = StyleSheet.create({
  main: { paddingHorizontal: theme.sizes.padding.sm, flex: 1 },
  listColumn: { columnGap: theme.sizes.padding.sm },
  listContainer: {
    rowGap: theme.sizes.padding.sm,
    paddingBottom: theme.sizes.padding.sm,
  },
});
