import { View } from "react-native";
import React, { useState } from "react";
import { theme } from "@/theme";
import Input from "@/components/ui/Input";
import AnimeGrid from "@/components/anime-lists/AnimeGrid";
import useAnimeSearch from "@/queries/jikan/use-anime-search";

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
      <AnimeGrid query={query} />
    </View>
  );
}
