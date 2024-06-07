import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ModalContentProps {
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  const { styles } = useStyles(stylesheet);

  return <View style={styles.container}>{children}</View>;
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.md,
    overflow: "hidden",
    margin: theme.spacing.lg,
  },
}));
