import { StyleSheet, View } from "react-native";
import React from "react";
import { useSearchActions, useSearchStatus } from "@/stores/SearchStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { AnimeStatus } from "@/types";
import FiltersList from "./FiltersList";

const statuses: { name: string; value?: AnimeStatus }[] = [
  { name: "All" },
  { name: "Finished", value: AnimeStatus.FINISHED },
  { name: "Airing", value: AnimeStatus.AIRING },
  { name: "Upcoming", value: AnimeStatus.UPCOMING },
] as const;

export default function StatusSelection() {
  const { styles } = useStyles(stylesheet);

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

const stylesheet = createStyleSheet((theme) => ({
  main: { rowGap: theme.spacing.sm },
}));
