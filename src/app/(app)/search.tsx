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
  useSearchQuery,
} from "@/stores/SearchStore";

export default function SearchPage() {
  return (
    <SearchProvider>
      <View style={{ height: "100%" }}>
        <View
          style={{
            padding: theme.sizes.padding.sm,
            flexDirection: "row",
            columnGap: theme.sizes.gap.sm,
          }}
        >
          <SearchView />
        </View>
        <SearchResults />
      </View>
    </SearchProvider>
  );
}

function SearchView() {
  const searchQuery = useSearchQuery();
  const { setQuery } = useSearchActions();

  return (
    <View>
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
  const searchQuery = useSearchQuery();

  const query = useAnimeSearch({ q: searchQuery });

  return (
    <AnimeGrid
      query={query}
      onRefresh={() => {
        queryClient.setQueryData<InfiniteData<any>>(
          jikanKeys.search({ q: searchQuery }),
          (data) => ({
            pages: data?.pages.slice(0, 1) ?? [],
            pageParams: data?.pageParams.slice(0, 1) ?? [],
          })
        );
        query.refetch();
      }}
    />
  );
}
