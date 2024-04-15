import { TouchableOpacity } from "react-native";
import React from "react";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import { theme } from "@/theme";

interface Props {
  onReload: () => void;
}

export default function ReloadButton({ onReload }: Props) {
  return (
    <TouchableOpacity onPress={onReload}>
      <ArrowPathIcon
        color={theme.colors.foreground}
        size={theme.sizes.icon.md}
      />
    </TouchableOpacity>
  );
}
