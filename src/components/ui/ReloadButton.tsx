import React from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import IconButton from "./IconButton";
import { ThemeConfig } from "@/styles/theme";

interface Props extends TouchableOpacityProps {
  onReload: () => void;
  size?: keyof ThemeConfig["sizes"]["icon"];
  color?: keyof ThemeConfig["colors"];
}

export default function ReloadButton({
  onReload,
  size = "md",
  color = "foreground",
  onPress: _,
  ...props
}: Props) {
  return (
    <IconButton
      name="refresh"
      color={color}
      size={size}
      onPress={onReload}
      {...props}
    />
  );
}
