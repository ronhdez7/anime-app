import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { forwardRef } from "react";
import { theme } from "@/styles/theme";

interface Props extends TouchableOpacityProps {}

export default forwardRef<TouchableOpacity, Props>(function Button(
  { style, ...props },
  ref
) {
  const styles = stylesheet;

  return <TouchableOpacity ref={ref} style={[styles.main, style]} {...props} />;
});

const stylesheet = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
});
