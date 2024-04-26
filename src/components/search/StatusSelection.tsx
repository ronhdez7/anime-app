import { StyleSheet, View } from "react-native";
import React from "react";
import { useSearchActions, useSearchStatus } from "@/stores/SearchStore";
import { theme } from "@/styles/theme";
import Text from "../ui/Text";
import { AnimeStatus } from "@/types";
import FiltersList from "./FiltersList";

const statuses: { name: string; value?: AnimeStatus }[] = [
  { name: "All" },
  { name: "Finished", value: "complete" },
  { name: "Airing", value: "airing" },
  { name: "Upcoming", value: "upcoming" },
] as const;

export default function StatusSelection() {
  const styles = stylesheet;

  const searchStatus = useSearchStatus();
  const { selectStatus } = useSearchActions();

  return (
    <View style={styles.main}>
      <Text weight="bold">Status</Text>

      <FiltersList
        data={statuses.map((s) => ({ ...s, key: s.name }))}
        isSelected={(item) => item.value === searchStatus}
        onPress={(item) => selectStatus(item.value)}
      />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  main: { rowGap: theme.spacing.sm },
});
