import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ModalContentProps {
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  const { styles } = useStyles(stylesheet);

  return <View style={styles.content}>{children}</View>;
}

const stylesheet = createStyleSheet((theme) => ({
  content: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.md,
    overflow: "hidden",
    width: "100%",
  },
}));
