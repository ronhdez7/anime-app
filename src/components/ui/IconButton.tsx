import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface IconButtonProps extends ComponentProps<typeof TouchableOpacity> {}
export default function IconButton({ style, ...props }: IconButtonProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.default, style]}
      {...props}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  default: {
    padding: theme.spacing.sm,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
}));
