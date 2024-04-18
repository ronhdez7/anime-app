import { View, ActivityIndicator, ViewProps } from "react-native";
import React from "react";
import { theme } from "@/theme";

interface Props extends ViewProps {
  size?: number;
  color?: keyof typeof theme.colors;
}

export default function LoadingView({
  size = theme.sizes.icon.md,
  color = "text",
  style,
  ...props
}: Props) {
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        },
        style,
      ]}
      {...props}
    >
      <ActivityIndicator color={theme.colors[color]} size={size} />
    </View>
  );
}
