import { View, RefreshControl } from "react-native";
import { NoAnimeFound, getInfiniteData } from "./AnimeList";
import { createStyleSheet, useStyles } from "react-native-unistyles";
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
  const { styles } = useStyles(gridStylesheet);

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
      onEndReachedThreshold={1}
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
  const { styles } = useStyles(gridViewStylesheet);

  function handleEndReached() {
    if ("fetchNextPage" in query && !query.isFetching && query.hasNextPage) {
      query.fetchNextPage();
    }
  }

  return (
    <View style={styles.main}>
      {query.data ? (
        <AnimeGrid
          data={getInfiniteData(query.data)}
          onEndReached={handleEndReached}
          // onScrollEndDrag={(e) => {
          //   if (
          //     e.nativeEvent.contentOffset.y +
          //       e.nativeEvent.layoutMeasurement.height +
          //       e.nativeEvent.layoutMeasurement.height / 3 >
          //     e.nativeEvent.contentSize.height
          //   ) {
          //     handleEndReached();
          //   }
          // }}
          ListFooterComponent={() =>
            (query as any).isFetchingNextPage && (
              <LoadingView color="foreground" />
            )
          }
          onRefresh={onRefresh}
        />
      ) : query.error ? (
        <AnimeFetchError
          message={query.error.message}
          onReload={query.refetch}
        />
      ) : (
        <LoadingView />
      )}
    </View>
  );
}

const gridViewStylesheet = createStyleSheet((theme) => ({
  main: { paddingHorizontal: theme.spacing.sm, flex: 1 },
}));

const gridStylesheet = createStyleSheet((theme) => ({
  listColumn: { columnGap: theme.spacing.sm },
  listContainer: {
    rowGap: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
}));
