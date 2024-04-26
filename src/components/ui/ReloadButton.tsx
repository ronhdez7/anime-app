import React from "react";
import { UnistylesThemes } from "react-native-unistyles";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import IconButton from "./IconButton";

interface Props extends TouchableOpacityProps {
  onReload: () => void;
  size?: keyof UnistylesThemes["light"]["sizes"]["text"];
  color?: keyof UnistylesThemes["light"]["colors"];
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
