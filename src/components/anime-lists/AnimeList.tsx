import { FlatList, FlatListProps, View } from "react-native";
import { theme } from "@/styles/theme";
import Text from "@/components/ui/Text";
import ReloadButton from "../ReloadButton";
import LoadingView from "../ui/LoadingView";
import { AnimeData, AnimeDataQueryResult } from "@/types";
import { AnimeListItem } from "./AnimeListItem";

export interface AnimeListProps extends Partial<FlatListProps<AnimeData>> {
  data: AnimeData[];
}
export default function AnimeList({ ...props }: AnimeListProps) {
  return (
    <FlatList
      renderItem={({ item }) => <AnimeListItem anime={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: theme.sizes.padding.sm,
        gap: theme.sizes.padding.sm,
      }}
      keyExtractor={(item, index) =>
        item?.mal_id.toString() ?? index.toString()
      }
      onEndReachedThreshold={2}
      keyboardShouldPersistTaps="never"
      keyboardDismissMode="on-drag"
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
  return (
    <View style={{ rowGap: theme.sizes.gap.xs }}>
      <Text style={{ paddingLeft: theme.sizes.padding.sm }} weight="bold">
        {title}
      </Text>

      <View
        style={{
          height: 180,
          borderRadius: theme.sizes.radius.md,
          backgroundColor: theme.colors.secondary,
          overflow: "hidden",
        }}
      >
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
          />
        ) : (
          <LoadingView color="foreground" />
        )}
      </View>
    </View>
  );
}

interface AnimeFetchErrorProps {
  message?: string;
  onReload?: () => void;
}
export function AnimeFetchError({ message, onReload }: AnimeFetchErrorProps) {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        rowGap: theme.sizes.gap.xl,
      }}
    >
      <View
        style={{
          alignItems: "center",
          rowGap: theme.sizes.gap.sm,
        }}
      >
        <Text foreground>Could not get anime</Text>
        {message && (
          <Text size="sm" foreground>
            Error: {message}
          </Text>
        )}
      </View>
      {onReload && <ReloadButton onReload={onReload} />}
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
