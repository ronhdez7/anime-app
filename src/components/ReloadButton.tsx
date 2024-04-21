import { TouchableOpacity } from "react-native";
import React from "react";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import { theme } from "@/theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";

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
      <ArrowPathIcon
        color={theme.colors[color]}
        size={theme.sizes.icon[size]}
      />
    </TouchableOpacity>
  );
}
