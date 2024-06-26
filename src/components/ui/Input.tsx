import { TextInputProps, TextInput, StyleSheet } from "react-native";
import React, { forwardRef } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends TextInputProps {}

export default forwardRef<TextInput, Props>(function Input(
  { style, cursorColor, placeholderTextColor, onTouchStart, ...props },
  ref
) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TextInput
      ref={ref}
      style={[styles.main, style]}
      cursorColor={cursorColor ?? theme.colors.primary}
      placeholderTextColor={placeholderTextColor ?? theme.colors.inactive}
      onTouchStart={(e) => {
        e.stopPropagation();
        onTouchStart?.(e);
      }}
      {...props}
    />
  );
});

const stylesheet = createStyleSheet((theme) => ({
  main: {
    height: 40,
    fontSize: theme.sizes.text.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.neutral,
    color: theme.colors.text,
  },
}));
