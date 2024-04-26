import { Text as RNText, TextProps } from "react-native";
import React, { forwardRef } from "react";
import { UnistylesThemes, useStyles } from "react-native-unistyles";

interface Props extends TextProps {
  size?: keyof UnistylesThemes["light"]["sizes"]["text"];
  color?: keyof UnistylesThemes["light"]["colors"];
  weight?: keyof UnistylesThemes["light"]["fonts"]["inter"];
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
