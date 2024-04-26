import { StyleSheet, View } from "react-native";
import React from "react";
import { useSearchActions, useSearchType } from "@/stores/SearchStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { AnimeSearchType } from "@/types";
import FiltersList from "./FiltersList";

const types: { name: string; value?: AnimeSearchType }[] = [
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
