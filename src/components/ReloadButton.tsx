import { TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "@/styles/theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { Icon } from "@/styles/icons";

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
    <TouchableOpacity onPress={onReload} {...props}>
      <Icon
        name="refresh"
        color={theme.colors[color]}
        size={theme.sizes.icon[size]}
      />
    </TouchableOpacity>
  );
}
