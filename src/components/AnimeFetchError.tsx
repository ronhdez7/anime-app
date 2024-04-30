import { createStyleSheet, useStyles } from "react-native-unistyles";
import { View } from "react-native";
import Text from "./ui/Text";
import ReloadButton from "./ui/ReloadButton";

interface AnimeFetchErrorProps {
  message?: string;
  error?: string;
  onReload?: () => void;
  foreground?: boolean;
}
export default function AnimeFetchError({
  message,
  onReload,
  error,
  foreground,
}: AnimeFetchErrorProps) {
  const { styles } = useStyles(stylesheet);
  const color = foreground ? "foreground" : "text";

  return (
    <View style={styles.main}>
      <View style={styles.detailsContainer}>
        <Text color={color}>{error ?? "Could not get anime"}</Text>
        {message && (
          <Text size="sm" color={color}>
            Error: {message}
          </Text>
        )}
      </View>
      {onReload && <ReloadButton onReload={onReload} color={color} />}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    rowGap: theme.spacing.xl,
  },
  detailsContainer: {
    alignItems: "center",
    rowGap: theme.spacing.sm,
  },
}));
