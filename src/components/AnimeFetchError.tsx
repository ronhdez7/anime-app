import { theme } from "@/styles/theme";
import { StyleSheet, View } from "react-native";
import Text from "./ui/Text";
import ReloadButton from "./ui/ReloadButton";

interface AnimeFetchErrorProps {
  message?: string;
  onReload?: () => void;
  foreground?: boolean;
}
export default function AnimeFetchError({
  message,
  onReload,
  foreground,
}: AnimeFetchErrorProps) {
  const styles = stylesheet;
  return (
    <View style={styles.main}>
      <View style={styles.detailsContainer}>
        <Text foreground={foreground}>Could not get anime</Text>
        {message && (
          <Text size="sm" foreground={foreground}>
            Error: {message}
          </Text>
        )}
      </View>
      {onReload && (
        <ReloadButton
          onReload={onReload}
          color={foreground ? "foreground" : "text"}
        />
      )}
    </View>
  );
}

const stylesheet = StyleSheet.create({
  main: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    rowGap: theme.sizes.gap.xl,
  },
  detailsContainer: {
    alignItems: "center",
    rowGap: theme.sizes.gap.sm,
  },
});
