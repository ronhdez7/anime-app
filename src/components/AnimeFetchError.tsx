import { createStyleSheet, useStyles } from "react-native-unistyles";
import { TouchableOpacity, View } from "react-native";
import Text from "./ui/Text";
import { RefreshIcon } from "@/components/icons/RefreshIcon";

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
      {onReload && (
        <TouchableOpacity onPress={onReload} style={styles.reloadButton}>
          <RefreshIcon color={color} />
        </TouchableOpacity>
      )}
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
  reloadButton: { padding: theme.spacing.sm, borderRadius: 10000 },
}));
