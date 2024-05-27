import { View } from "react-native";
import React from "react";
import { useSearchActions, useSearchType } from "@/stores/SearchStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { AnimeType } from "@/types";
import FiltersList from "./FiltersList";

const types: { name: string; value?: AnimeType }[] = [
  { name: "All" },
  { name: "TV", value: AnimeType.TV },
  { name: "Movie", value: AnimeType.MOVIE },
  { name: "OVA", value: AnimeType.OVA },
  { name: "Special", value: AnimeType.SPECIAL },
  { name: "ONA", value: AnimeType.ONA },
  { name: "Music", value: AnimeType.MUSIC },
  // { name: "CM", value: "cm" },
  // { name: "PV", value: "pv" },
  // { name: "TV Special", value: "tv_special" },
] as const;

export default function TypesSelection() {
  const { styles } = useStyles(stylesheet);

  const searchType = useSearchType();
  const { selectType } = useSearchActions();

  return (
    <View style={styles.main}>
      <Text weight="bold">Type</Text>

      <FiltersList
        data={types.map((i) => ({ ...i, key: i.name }))}
        isSelected={(item) => item.value === searchType}
        onPress={(item) => selectType(item.value)}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { rowGap: theme.spacing.sm },
}));
