import { getInfiniteData } from "@/lib/utils";
import { AnimeData, AnimeDataQueryResult } from "@/types";
import { RefreshControl, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import AnimeFetchError from "../AnimeFetchError";
import { CellContainer, MasonryFlashList } from "@shopify/flash-list";
import { AnimeListItem } from "./AnimeListItem";
import { useState } from "react";
import LoadingView from "../ui/LoadingView";
import { NoAnimeFound } from "./NoAnimeFound";
import { listDefaultProps } from "../ui/List";

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
        <MasonryFlashList
          {...listDefaultProps}
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
  container: { paddingHorizontal: theme.spacing.sm, flex: 1 },
  itemWrapper: (isLeft: boolean) => ({
    paddingLeft: isLeft ? 0 : theme.spacing.sm / 2,
    paddingRight: isLeft ? theme.spacing.sm / 2 : 0,
  }),
  separator: { height: theme.spacing.sm },
}));
