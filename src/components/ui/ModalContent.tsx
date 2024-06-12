import { View, ViewProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ModalContentProps extends ViewProps {}

export default function ModalContent({ style, ...props }: ModalContentProps) {
  const { styles } = useStyles(stylesheet);

  return <View style={[styles.content, style]} {...props} />;
}

const stylesheet = createStyleSheet((theme) => ({
  content: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.md,
    overflow: "hidden",
    width: "100%",
    padding: theme.spacing.xl,
  },
}));
