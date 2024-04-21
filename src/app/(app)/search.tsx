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
  useSearchGenres,
  useSearchQuery,
} from "@/stores/SearchStore";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Text from "@/components/ui/Text";
import { useMemo } from "react";

export default function SearchPage() {
  return (
    <SearchProvider>
      <View style={{ height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            padding: theme.sizes.padding.sm,
            columnGap: theme.sizes.gap.sm,
          }}
        >
          <SearchBar />
        </View>
        <SearchResults />

        <FiltersBottomSheet />
      </View>
    </SearchProvider>
  );
}

function SearchBar() {
  const searchQuery = useSearchQuery();
  const { setQuery } = useSearchActions();

  return (
    <Input
      style={{ flex: 1 }}
      placeholder="Search"
      value={searchQuery}
      onChangeText={setQuery}
    />
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

function FiltersBottomSheet() {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const { genres } = useSearchAll();

  return (
    <BottomSheet
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.foreground }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
    >
      <BottomSheetScrollView style={{ padding: theme.sizes.padding.sm }}>
        <Text>This is really cool</Text>
        <GenresList />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

function GenresList() {
  const genres = useSearchGenres();
  const { addGenre, removeGenre } = useSearchActions();

  return (
    <View>
      <Text weight="bold">Genres</Text>
      <View></View>
    </View>
  );
}
