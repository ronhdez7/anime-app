import { View } from "react-native";
import { theme } from "@/theme";
import Input from "@/components/ui/Input";
import AnimeGrid from "@/components/anime-lists/AnimeGrid";
import useAnimeSearch from "@/queries/jikan/use-anime-search";
import { queryClient } from "@/lib/query-client";
import { jikanKeys } from "@/queries/jikan/use-jikan-query";
import { InfiniteData } from "@tanstack/react-query";
import SearchProvider, {
  useSearchActions,
  useSearchAll,
  useSearchQuery,
} from "@/stores/SearchStore";

export default function SearchPage() {
  return (
    <SearchProvider>
      <View style={{ height: "100%" }}>
        <SearchView />
        <SearchResults />
      </View>
    </SearchProvider>
  );
}

function SearchView() {
  const searchQuery = useSearchQuery();
  const { setQuery } = useSearchActions();

  return (
    <View
      style={{
        flexDirection: "row",
        padding: theme.sizes.padding.sm,
        columnGap: theme.sizes.gap.sm,
      }}
    >
      <Input
        style={{ flex: 1 }}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setQuery}
      />
    </View>
  );
}

function SearchResults() {
  const params = useSearchAll();

  const query = useAnimeSearch(params);

  function refresh() {
    queryClient.setQueryData<InfiniteData<any>>(
      jikanKeys.search(params),
      (data) => ({
        pages: data?.pages.slice(0, 1) ?? [],
        pageParams: data?.pageParams.slice(0, 1) ?? [],
      })
    );
    query.refetch();
  }

  return <AnimeGrid query={query} onRefresh={refresh} />;
}
