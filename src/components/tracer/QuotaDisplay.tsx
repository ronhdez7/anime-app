import { useTracerQuota } from "@/queries/use-tracer-quota";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import LoadingView from "../ui/LoadingView";
import Text from "../ui/Text";
import { clamp } from "@/lib/utils";

export default function QuotaDisplay() {
  const { styles } = useStyles(stylesheet);

  const quota = useTracerQuota();

  const errorMessage = quota.error?.message ?? quota.error?.error;

  return (
    <View style={styles.container}>
      <Text size="lg" weight="bold">
        Details
      </Text>

      {quota.data ? (
        <View style={styles.details}>
          <Text>ID: {quota.data.id}</Text>
          <Text>Priority: {quota.data.priority}</Text>
          <Text>Concurrency: {quota.data.concurrency}</Text>
          <Text>Quota: {quota.data.quota}</Text>
          <Text>Used: {quota.data.quotaUsed}</Text>
          <Text>
            Remaining:{" "}
            {clamp(
              quota.data.quota - quota.data.quotaUsed,
              quota.data.quota,
              0
            )}
          </Text>
        </View>
      ) : quota.isLoading ? (
        <LoadingView />
      ) : (
        <View style={styles.details}>
          <Text>Error fetching quota</Text>
          {errorMessage && <Text>Error: {errorMessage}</Text>}
        </View>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.sm,
    rowGap: theme.spacing.md,
  },
  details: {
    rowGap: theme.spacing.sm,
  },
}));
