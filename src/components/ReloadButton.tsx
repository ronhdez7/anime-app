import React from "react";
import { theme } from "@/styles/theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import IconButton from "./ui/IconButton";

interface Props extends TouchableOpacityProps {
  onReload: () => void;
  size?: keyof typeof theme.sizes.icon;
  color?: keyof typeof theme.colors;
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
      color={theme.colors[color]}
      size={theme.sizes.icon[size]}
      onPress={onReload}
      {...props}
    />
  );
}
