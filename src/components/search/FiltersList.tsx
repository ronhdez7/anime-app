import React from "react";
import Badge from "../ui/Badge";
import Text from "../ui/Text";
import { StyleSheet, View } from "react-native";
import { theme } from "@/styles/theme";

interface FilterItem {
  name: string;
  value?: string | number;
  key: any;
}

interface Props<T extends FilterItem> {
  data: T[];
  isSelected: (item: T) => boolean;
  onPress: (item: T, selected: boolean) => void;
}

export default function FiltersList<T extends FilterItem>({
  data,
  isSelected,
  onPress,
}: Props<T>) {
  const styles = stylesheet;

  return (
    <View style={styles.main}>
      {data.map((item) => {
        const selected = isSelected(item);

        return (
          <Badge
            style={selected && styles.selectedBadge}
            onPress={() => onPress(item, selected)}
            key={item.key}
          >
            <Text
              size="sm"
              style={{
                color: selected
                  ? theme.colors.foreground
                  : theme.colors.primary,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </Badge>
        );
      })}
    </View>
  );
}

const stylesheet = StyleSheet.create({
  main: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.sizes.gap.xs,
  },
  selectedBadge: { backgroundColor: theme.colors.primary },
});
