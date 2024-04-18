import { TextInput, View } from "react-native";
import React, { useState } from "react";
import Text from "@/components/ui/Text";
import { useJikanInfiniteQuery } from "@/hooks/use-jikan-query";
import jikan from "@/lib/jikan";
import { theme } from "@/theme";
import Input from "@/components/ui/Input";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // const query = useJikanInfiniteQuery({
  //   queryKey: ["anime", "search", searchQuery],
  //   queryFn: ({ pageParam, signal }) =>
  //     jikan.getAnimeSearch({ q: searchQuery, page: pageParam }, { signal }),
  // });

  return (
    <View>
      <View style={{ padding: theme.sizes.padding.sm }}>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
}
