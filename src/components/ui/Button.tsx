import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { forwardRef } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends TouchableOpacityProps {}

export default forwardRef<TouchableOpacity, Props>(function Button(
  { style, ...props },
  ref
) {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      ref={ref}
      style={[styles.main, style]}
      {...props}
    />
  );
});

const stylesheet = createStyleSheet((theme) => ({
  main: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing["xl"],
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
}));
