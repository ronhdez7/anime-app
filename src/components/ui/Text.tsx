import { Text as RNText, TextProps } from "react-native";
import React, { forwardRef } from "react";
import { useStyles } from "react-native-unistyles";
import { ThemeConfig } from "@/styles/theme";

interface Props extends TextProps {
  size?: keyof ThemeConfig["sizes"]["text"];
  color?: Exclude<keyof ThemeConfig["colors"], "skeleton">;
  weight?: keyof ThemeConfig["fonts"]["inter"];
}

export default forwardRef<RNText, Props>(function Text(
  { style, size = "md", color = "text", weight = "medium", ...props },
  ref
) {
  const { theme } = useStyles();

  return (
    <RNText
      style={[
        {
          fontSize: theme.sizes.text[size],
          fontFamily: theme.fonts.inter[weight],
          color: theme.colors[color],
        },
        style,
      ]}
      {...props}
      ref={ref}
    />
  );
});
