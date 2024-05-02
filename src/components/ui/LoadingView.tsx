import { View, ActivityIndicator, ViewProps } from "react-native";
import React from "react";
import { useStyles } from "react-native-unistyles";
import { ThemeConfig } from "@/styles/theme";

interface Props extends ViewProps {
  size?: keyof ThemeConfig["sizes"]["icon"];
  color?: keyof ThemeConfig["colors"];
}

export default function LoadingView({
  size = "md",
  color = "text",
  style,
  ...props
}: Props) {
  const { theme } = useStyles();

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
      <ActivityIndicator
        color={theme.colors[color]}
        size={theme.sizes.icon[size]}
      />
    </View>
  );
}
