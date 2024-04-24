import { View } from "react-native";
import React from "react";
import { useSearchActions, useSearchStatus } from "@/stores/SearchStore";
import { theme } from "@/styles/theme";
import Text from "../ui/Text";
import Badge from "../ui/Badge";
import { AnimeStatus } from "@/types";

const statuses: { name: string; value?: AnimeStatus }[] = [
  { name: "All" },
  { name: "Finished", value: "complete" },
  { name: "Airing", value: "airing" },
  { name: "Upcoming", value: "upcoming" },
] as const;

export default function StatusSelection() {
  const searchStatus = useSearchStatus();
  const { selectStatus } = useSearchActions();

  return (
    <View style={{ rowGap: theme.sizes.gap.sm }}>
      <Text weight="bold">Status</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.sizes.gap.xs,
        }}
      >
        {statuses.map((status) => {
          const isSelected = status.value === searchStatus;

          return (
            <Badge
              style={isSelected && { backgroundColor: theme.colors.primary }}
              onPress={() => selectStatus(status.value)}
              key={status.name}
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
                {status.name}
              </Text>
            </Badge>
          );
        })}
      </View>
    </View>
  );
}
