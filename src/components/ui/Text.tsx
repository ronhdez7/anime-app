import { Text as RNText, TextProps } from "react-native";
import React, { forwardRef } from "react";
import { theme } from "@/styles/theme";

interface Props extends TextProps {
  size?: keyof typeof theme.sizes.text;
  foreground?: boolean;
  weight?: keyof typeof theme.fonts.inter;
}

export default forwardRef<RNText, Props>(function Text(
  { style, size = "md", foreground = false, weight = "medium", ...props },
  ref
) {
  return (
    <RNText
      style={[
        {
          fontSize: theme.sizes.text[size],
          fontFamily: theme.fonts.inter[weight],
          color: foreground ? theme.colors.foreground : theme.colors.text,
        },
        style,
      ]}
      {...props}
      ref={ref}
    />
  );
});
