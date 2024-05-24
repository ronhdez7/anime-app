import { View, ActivityIndicator, ViewProps } from "react-native";
import React from "react";
import { useStyles } from "react-native-unistyles";
import { ThemeConfig } from "@/styles/theme";
import SpinningLoader from "./SpinningLoader";

interface Props extends ViewProps {
  size?: keyof ThemeConfig["sizes"]["icon"];
  color?: Exclude<keyof ThemeConfig["colors"], "skeleton">;
}

export default function LoadingView({ size, color, style, ...props }: Props) {
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
      <SpinningLoader size={size} color={color} />
    </View>
  );
}
