import React from "react";
import Badge from "../ui/Badge";
import Text from "../ui/Text";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

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
  const { styles } = useStyles(stylesheet);

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
              style={{ textAlign: "center" }}
              color={selected ? "foreground" : "primary"}
            >
              {item.name}
            </Text>
          </Badge>
        );
      })}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.xs,
  },
  selectedBadge: { backgroundColor: theme.colors.primary },
}));
