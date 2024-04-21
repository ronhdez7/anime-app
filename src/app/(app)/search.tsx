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
import useAnimeGenres from "@/queries/jikan/use-anime-genres";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

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

  return (
    <BottomSheet
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.foreground }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
    >
      <BottomSheetScrollView style={{ padding: theme.sizes.padding.sm }}>
        <GenresList />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

function GenresList() {
  const genres = useSearchGenres();
  const { addGenre, removeGenre } = useSearchActions();

  const { data } = useAnimeGenres();

  return (
    <View style={{ rowGap: theme.sizes.gap.sm }}>
      <Text weight="bold">Genres</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: theme.sizes.gap.xs,
          rowGap: theme.sizes.gap.xs,
        }}
      >
        {data &&
          data.map((genre) => {
            const isSelected = genres.includes(genre.mal_id);

            return (
              <Badge
                style={isSelected && { backgroundColor: theme.colors.primary }}
                onPress={() =>
                  isSelected
                    ? removeGenre(genre.mal_id)
                    : addGenre(genre.mal_id)
                }
              >
                <Text
                  size="sm"
                  style={{
                    color: isSelected
                      ? theme.colors.foreground
                      : theme.colors.primary,
                  }}
                  key={genre.name}
                >
                  {genre.name}
                </Text>
              </Badge>
            );
          })}
      </View>
    </View>
  );
}
