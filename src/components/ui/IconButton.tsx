import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Icon, IconControllerProps } from "@/styles/icons";
import {
  UnistylesThemes,
  createStyleSheet,
  useStyles,
} from "react-native-unistyles";

interface IconButtonProps
  extends TouchableOpacityProps,
    Pick<IconControllerProps, "name"> {
  size?: keyof UnistylesThemes["light"]["sizes"]["text"];
  color?: keyof UnistylesThemes["light"]["colors"];
}

export default function IconButton({
  name,
  size = "md",
  color = "text",
  style,
  ...props
}: IconButtonProps) {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <TouchableOpacity style={[styles.main, style]} {...props}>
      <Icon
        name={name}
        color={theme.colors[color]}
        size={theme.sizes.icon[size]}
      />
    </TouchableOpacity>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { padding: theme.spacing.sm, borderRadius: 10000 },
}));
