import { View } from "react-native";
import React from "react";
import { useSearchActions, useSearchType } from "@/stores/SearchStore";
import { theme } from "@/styles/theme";
import Text from "../ui/Text";
import { JikanAnimeSearchType } from "@/lib/jikan";
import Badge from "../ui/Badge";

const types: { name: string; value?: JikanAnimeSearchType }[] = [
  { name: "All" },
  { name: "TV", value: "tv" },
  { name: "Movie", value: "movie" },
  { name: "OVA", value: "ova" },
  { name: "Special", value: "special" },
  { name: "ONA", value: "ona" },
  { name: "Music", value: "music" },
  { name: "CM", value: "cm" },
  { name: "PV", value: "pv" },
  { name: "TV Special", value: "tv_special" },
] as const;

export default function TypesSelection() {
  const searchType = useSearchType();
  const { selectType } = useSearchActions();

  return (
    <View style={{ rowGap: theme.sizes.gap.sm }}>
      <Text weight="bold">Type</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.sizes.gap.xs,
        }}
      >
        {types.map((type) => {
          const isSelected = type.value === searchType;

          return (
            <Badge
              style={isSelected && { backgroundColor: theme.colors.primary }}
              onPress={() => selectType(type.value)}
              key={type.name}
            >
              <Text
                size="sm"
                style={{
                  color: isSelected
                    ? theme.colors.foreground
                    : theme.colors.primary,
                  textAlign: "center",
                }}
              >
                {type.name}
              </Text>
            </Badge>
          );
        })}
      </View>
    </View>
  );
}
