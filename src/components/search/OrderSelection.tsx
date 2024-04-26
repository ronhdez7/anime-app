import { StyleSheet, View } from "react-native";
import React from "react";
import {
  useSearchActions,
  useSearchOrderBy,
  useSearchSort,
} from "@/stores/SearchStore";
import { theme } from "@/styles/theme";
import Text from "../ui/Text";
import { AnimeSearchOrder } from "@/types";
import IconButton from "../ui/IconButton";
import FiltersList from "./FiltersList";

const orders: { name: string; value?: AnimeSearchOrder }[] = [
  { name: "N/A" },
  { name: "Title", value: "title" },
  { name: "Start Date", value: "start_date" },
  { name: "End Date", value: "end_date" },
  { name: "Score", value: "score" },
  { name: "Rank", value: "rank" },
  { name: "Popularity", value: "popularity" },
] as const;

export default function OrderSelection() {
  const styles = stylesheet;

  const searchOrder = useSearchOrderBy();
  const searchSort = useSearchSort();
  const { selectOrder, selectSort } = useSearchActions();

  return (
    <View style={styles.main}>
      <View style={styles.filterHeader}>
        <View style={styles.headerLeft}>
          <Text weight="bold">Sort</Text>
          <IconButton
            onPress={() => selectSort(searchSort === "desc" ? "asc" : "desc")}
            name={searchSort === "desc" ? "arrow-down" : "arrow-up"}
            size={theme.sizes.icon.xs}
            style={{ padding: 0 }}
          />
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

const stylesheet = StyleSheet.create({
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
});
