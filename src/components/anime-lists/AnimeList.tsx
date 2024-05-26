import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import LoadingView from "../ui/LoadingView";
import { AnimeData, AnimeDataQueryResult } from "@/types";
import { AnimeListItem } from "./AnimeListItem";
import List, { ListProps } from "@/components/ui/List";
import AnimeFetchError from "../AnimeFetchError";

export interface AnimeListProps extends Partial<ListProps<AnimeData>> {
  data: AnimeData[];
}
export default function AnimeList({ ...props }: AnimeListProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <List
      renderItem={({ item }) => <AnimeListItem anime={item} />}
      horizontal
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={NoAnimeFound}
      {...props}
    />
  );
}

interface AnimeListViewProps {
  title: string;
  query: AnimeDataQueryResult;
}
export function AnimeListView({ title, query }: AnimeListViewProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.listView}>
      <Text style={styles.listHeader} size="lg" weight="bold">
        {title}
      </Text>

      <View style={styles.listWrapper}>
        {query.data || query.isLoading ? (
          <AnimeList
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
            ListFooterComponent={() =>
              (query as any).isFetchingNextPage && (
                <LoadingView color="foreground" />
              )
            }
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

export function getInfiniteData<T>(data?: T[] | { pages: T[][] }): T[] {
  return (
    (Array.isArray(data) ? data : data?.pages.flatMap((page) => page)) ??
    Array(5)
  );
}

export function NoAnimeFound() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>No anime found</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  listContainer: {
    gap: theme.spacing.sm,
  },
  listView: { rowGap: theme.spacing.xs },
  listHeader: { paddingLeft: theme.spacing.sm },
  listWrapper: {
    height: 250,
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },
}));
