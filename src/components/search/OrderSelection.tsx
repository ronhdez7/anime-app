import { TouchableOpacity, View } from "react-native";
import React from "react";
import {
  useSearchActions,
  useSearchOrder,
  useSearchSort,
} from "@/stores/SearchStore";
import { theme } from "@/styles/theme";
import Text from "../ui/Text";
import Badge from "../ui/Badge";
import { AnimeSearchOrder } from "@/types";
import { Icon } from "@/styles/icons";
import IconButton from "../ui/IconButton";

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
  const searchOrder = useSearchOrder();
  const searchSort = useSearchSort();
  const { selectOrder, selectSort } = useSearchActions();

  return (
    <View style={{ rowGap: theme.sizes.gap.sm }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: theme.sizes.gap.sm,
          }}
        >
          <Text weight="bold">Sort</Text>
          <IconButton
            onPress={() => selectSort(searchSort === "desc" ? "asc" : "desc")}
            name={searchSort === "desc" ? "arrow-down" : "arrow-up"}
            size={theme.sizes.icon.xs}
            style={{ padding: 0 }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.sizes.gap.xs,
        }}
      >
        {orders.map((order) => {
          const isSelected = order.value === searchOrder;

          return (
            <Badge
              style={isSelected && { backgroundColor: theme.colors.primary }}
              onPress={() => selectOrder(order.value)}
              key={order.name}
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
                {order.name}
              </Text>
            </Badge>
          );
        })}
      </View>
    </View>
  );
}
