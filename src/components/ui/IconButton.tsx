import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Icon, IconControllerProps } from "@/styles/icons";
import { theme } from "@/styles/theme";

interface IconButtonProps
  extends TouchableOpacityProps,
    Pick<IconControllerProps, "name" | "size" | "color"> {}

export default function IconButton({
  name,
  size = theme.sizes.icon.md,
  color = theme.colors.text,
  style,
  ...props
}: IconButtonProps) {
  const styles = stylesheet;
  return (
    <TouchableOpacity style={[styles.main, style]} {...props}>
      <Icon name={name} color={color} size={size} />
    </TouchableOpacity>
  );
}

const stylesheet = StyleSheet.create({
  main: { padding: theme.spacing.sm, borderRadius: 10000 },
});
