import { StyleSheet, View } from "react-native";
import { theme } from "@/styles/theme";
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
  const styles = stylesheet;

  return (
    <List
      renderItem={({ item }) => <AnimeListItem anime={item} />}
      horizontal
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item, index) =>
        item?.mal_id.toString() ?? index.toString()
      }
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
  const styles = stylesheet;

  return (
    <View style={styles.listView}>
      <Text style={styles.listHeader} weight="bold">
        {title}
      </Text>

      <View style={styles.listWrapper}>
        {query.data ? (
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
            ListFooterComponentStyle={{
              paddingLeft: theme.sizes.padding.xs,
              display:
                "isFetchingNextPage" in query && query.isFetchingNextPage
                  ? undefined
                  : "none",
            }}
            ListFooterComponent={() => <LoadingView color="foreground" />}
          />
        ) : query.error ? (
          <AnimeFetchError
            message={query.error.response?.data.message}
            onReload={query.refetch}
            foreground
          />
        ) : (
          <LoadingView color="foreground" />
        )}
      </View>
    </View>
  );
}

export function getInfiniteData(
  data?: AnimeData[] | { pages: AnimeData[][] }
): AnimeData[] {
  return (
    (Array.isArray(data) ? data : data?.pages.flatMap((page) => page)) ?? []
  );
}

export function NoAnimeFound() {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>No anime found</Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  listContainer: {
    padding: theme.sizes.padding.sm,
    gap: theme.sizes.padding.sm,
  },
  listView: { rowGap: theme.sizes.gap.xs },
  listHeader: { paddingLeft: theme.sizes.padding.sm },
  listWrapper: {
    height: 180,
    borderRadius: theme.sizes.radius.md,
    backgroundColor: theme.colors.secondary,
    overflow: "hidden",
  },
});
