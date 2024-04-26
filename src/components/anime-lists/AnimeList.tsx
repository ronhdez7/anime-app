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
            ListFooterComponent={() =>
              (query as any).isFetchingNextPage && (
                <LoadingView color="foreground" />
              )
            }
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

const stylesheet = createStyleSheet((theme) => ({
  listContainer: {
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  listView: { rowGap: theme.spacing.xs },
  listHeader: { paddingLeft: theme.spacing.sm },
  listWrapper: {
    height: 180,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.secondary,
    overflow: "hidden",
  },
}));
