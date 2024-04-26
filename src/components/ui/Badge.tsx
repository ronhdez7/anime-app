import { createStyleSheet, useStyles } from "react-native-unistyles";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {}

export default forwardRef<TouchableOpacity, Props>(function Badge(
  { style, ...props },
  ref
) {
  const { styles } = useStyles(stylesheet);
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.75}
      style={[styles.main, style]}
      {...props}
    />
  );
});

const stylesheet = createStyleSheet((theme) => ({
  main: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: "transparent",
    borderRadius: 10000,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    minWidth: 50,
  },
}));
