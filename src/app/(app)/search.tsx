import { View } from "react-native";
import React, { useState } from "react";
import { theme } from "@/theme";
import Input from "@/components/ui/Input";
import AnimeGrid from "@/components/anime-lists/AnimeGrid";
import useAnimeSearch from "@/queries/jikan/use-anime-search";
import { queryClient } from "@/lib/query-client";
import { jikanKeys } from "@/queries/jikan/use-jikan-query";
import { InfiniteData } from "@tanstack/react-query";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const query = useAnimeSearch({ q: searchQuery });

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
    </View>
  );
}
