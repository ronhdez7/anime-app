import { AnimeDataQueryResult } from "@/types";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { getInfiniteData } from "@/lib/utils";
import { AnimeListItem } from "./AnimeListItem";
import AnimeFetchError from "../AnimeFetchError";
import LoadingView from "../ui/LoadingView";
import { NoAnimeFound } from "./NoAnimeFound";
import List from "../ui/List";

interface AnimeListViewProps {
  title: string;
  query: AnimeDataQueryResult;
}
export default function AnimeListView({ title, query }: AnimeListViewProps) {
  const { styles } = useStyles(stylesheet);

  const data = getInfiniteData(query.data);

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text size="lg" weight="bold">
          {title}
        </Text>
      </View>

      <View style={styles.listContainer}>
        {query.data || query.isLoading ? (
          <List
            data={data}
            renderItem={({ item, index }) => (
              <View style={styles.itemWrapper(index === 0)}>
                <AnimeListItem anime={item} />
              </View>
            )}
            horizontal
            estimatedItemSize={183}
            onEndReached={() => {
              if (
                "fetchNextPage" in query &&
                !query.isFetching &&
                query.hasNextPage
              ) {
                query.fetchNextPage();
              }
            }}
            ListFooterComponent={() =>
              (query as any).isFetchingNextPage && (
                <LoadingView color="foreground" />
              )
            }
            ListEmptyComponent={NoAnimeFound}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <AnimeFetchError
            message={query.error?.message}
            onReload={query.refetch}
          />
        )}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: "flex-start",
    // rowGap: theme.spacing.sm,
  },
  listHeader: {
    paddingHorizontal: theme.spacing.sm,
  },
  listContainer: {
    height: 266,
  },
  itemWrapper: (isFirst: boolean) => ({
    paddingLeft: isFirst ? 0 : theme.spacing.md,
    height: "100%",
  }),
  listContent: {
    padding: theme.spacing.sm,
  },
}));
