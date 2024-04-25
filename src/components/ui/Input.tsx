import { TextInputProps, TextInput, StyleSheet } from "react-native";
import React, { forwardRef } from "react";
import { theme } from "@/styles/theme";

interface Props extends TextInputProps {}

export default forwardRef<TextInput, Props>(function Input(
  { style, cursorColor, placeholderTextColor, onTouchStart, ...props },
  ref
) {
  const styles = stylesheet;

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

const stylesheet = StyleSheet.create({
  main: {
    height: 40,
    fontSize: theme.sizes.text.md,
    paddingHorizontal: theme.sizes.padding.sm,
    borderRadius: theme.sizes.radius.xs,
    backgroundColor: theme.colors.neutral,
    color: theme.colors.text,
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 10, width: 10 },
    elevation: 10,
  },
});
