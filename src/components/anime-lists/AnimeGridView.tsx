import { getInfiniteData } from "@/lib/utils";
import { AnimeData, AnimeDataQueryResult } from "@/types";
import { RefreshControl, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import AnimeFetchError from "../AnimeFetchError";
import { AnimeListItem } from "./AnimeListItem";
import { useState } from "react";
import LoadingView from "../ui/LoadingView";
import { NoAnimeFound } from "./NoAnimeFound";
import List from "../ui/List";

interface AnimeGridViewProps {
  query: AnimeDataQueryResult;
  onRefresh?: () => void;
}

export default function AnimeGridView({
  query,
  onRefresh,
}: AnimeGridViewProps) {
  const { styles } = useStyles(stylesheet);

  const numColumns = 2;

  const data = getInfiniteData(query.data);

  const [refreshing, setRefreshing] = useState(false);
  function refresh() {
    setRefreshing(true);
    onRefresh?.();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  function handleEndReached() {
    if ("fetchNextPage" in query && !query.isFetching && query.hasNextPage) {
      query.fetchNextPage();
    }
  }

  const items: AnimeData[] = {
    ...data,
    length: Math.ceil(data.length / numColumns) * numColumns,
  };

  return (
    <View style={styles.container}>
      {query.data || query.isLoading ? (
        <List
          data={items}
          renderItem={({ item, index }) => (
            <View style={styles.itemWrapper(index % numColumns === 0)}>
              <AnimeListItem anime={item} />
            </View>
          )}
          numColumns={numColumns}
          estimatedItemSize={255}
          refreshControl={
            onRefresh && (
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            )
          }
          onEndReached={handleEndReached}
          ListFooterComponent={() =>
            (query as any).isFetchingNextPage && (
              <LoadingView color="foreground" />
            )
          }
          ListEmptyComponent={NoAnimeFound}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <AnimeFetchError
          message={query.error?.message}
          onReload={query.refetch}
        />
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: { flex: 1 },
  itemWrapper: (isLeft: boolean) => ({
    paddingLeft: isLeft ? 0 : theme.spacing.md / 2,
    paddingRight: isLeft ? theme.spacing.md / 2 : 0,
    width: "100%",
    height: "100%",
  }),
  separator: { height: theme.spacing.md },
  listContent: {
    padding: theme.spacing.md,
  },
}));
