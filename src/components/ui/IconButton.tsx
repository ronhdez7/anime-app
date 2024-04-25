import { TouchableOpacity, TouchableOpacityProps } from "react-native";
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
  return (
    <TouchableOpacity
      style={[{ padding: theme.sizes.padding.sm, borderRadius: 10000 }, style]}
      {...props}
    >
      <Icon name={name} color={color} size={size} />
    </TouchableOpacity>
  );
}
