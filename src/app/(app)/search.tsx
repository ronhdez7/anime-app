import { View } from "react-native";
import React, { useState } from "react";
import { useJikanInfiniteQuery } from "@/hooks/use-jikan-query";
import jikan from "@/lib/jikan";
import { theme } from "@/theme";
import Input from "@/components/ui/Input";
import AnimeGrid from "@/components/anime-lists/AnimeGrid";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const query = useJikanInfiniteQuery({
    queryKey: ["anime", "search", searchQuery],
    queryFn: ({ pageParam, signal }) =>
      jikan.getAnimeSearch(
        { q: searchQuery, page: pageParam, sfw: true },
        { signal }
      ),
  });

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          padding: theme.sizes.padding.sm,
          flexDirection: "row",
          columnGap: theme.sizes.gap.sm,
        }}
      >
        <Input
          style={{ flex: 1 }}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <AnimeGrid query={query} />
    </View>
  );
}
