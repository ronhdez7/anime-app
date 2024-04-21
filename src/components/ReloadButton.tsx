import { TouchableOpacity } from "react-native";
import React from "react";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import { theme } from "@/theme";

interface Props {
  onReload: () => void;
  size?: keyof typeof theme.sizes.icon
  color?: keyof typeof theme.colors

}

export default function ReloadButton({ onReload, size="md", color="foreground" }: Props) {
  return (
    <TouchableOpacity onPress={onReload}>
      <ArrowPathIcon
        color={theme.colors[color]}
        size={theme.sizes.icon[size]}
      />
    </TouchableOpacity>
  );
}
