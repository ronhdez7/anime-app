import { StyleSheet, View } from "react-native";
import React from "react";
import {
  useSearchActions,
  useSearchOrderBy,
  useSearchSort,
} from "@/stores/SearchStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { AnimeSearchOrder } from "@/types";
import IconButton from "../ui/IconButton";
import FiltersList from "./FiltersList";
import { ArrowDownIcon, ArrowUpIcon } from "../icons";

const orders: { name: string; value?: AnimeSearchOrder }[] = [
  { name: "N/A" },
  { name: "Title", value: AnimeSearchOrder.TITLE },
  { name: "Start Date", value: AnimeSearchOrder.START_DATE },
  { name: "End Date", value: AnimeSearchOrder.END_DATE },
  { name: "Score", value: AnimeSearchOrder.SCORE },
  { name: "Rank", value: AnimeSearchOrder.RANK },
  { name: "Popularity", value: AnimeSearchOrder.POPULARITY },
] as const;

export default function OrderSelection() {
  const { styles } = useStyles(stylesheet);

  const searchOrder = useSearchOrderBy();
  const searchSort = useSearchSort();
  const { selectOrder, selectSort } = useSearchActions();

  const SortIcon = searchSort === "desc" ? ArrowDownIcon : ArrowUpIcon;

  function toggleSort() {
    selectSort(searchSort === "desc" ? "asc" : "desc");
  }

  return (
    <View style={styles.main}>
      <View style={styles.filterHeader}>
        <View style={styles.headerLeft}>
          <Text weight="bold">Sort</Text>

          <IconButton onPress={toggleSort} style={styles.sortButton}>
            <SortIcon size="xs" />
          </IconButton>
        </View>
      </View>

      <FiltersList
        data={orders.map((i) => ({ ...i, key: i.name }))}
        isSelected={(item) => item.value === searchOrder}
        onPress={(item) => selectOrder(item.value)}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { rowGap: theme.spacing.sm },
  error: { flexDirection: "row", columnGap: 12, alignItems: "center" },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.sm,
  },
  sortButton: {
    padding: 0,
  },
}));
