import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Icon, IconControllerProps } from "@/styles/icons";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ThemeConfig } from "@/styles/theme";

export interface IconButtonProps
  extends TouchableOpacityProps,
    Pick<IconControllerProps, "name"> {
  size?: keyof ThemeConfig["sizes"]["icon"];
  color?: keyof ThemeConfig["colors"];
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
