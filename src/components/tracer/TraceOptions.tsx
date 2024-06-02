import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Checkbox from "../ui/Checkbox";
import { useTracerActions, useTracerCutBorders } from "@/stores/TracerStore";
import Text from "../ui/Text";

export default function TraceOptions() {
  const { styles } = useStyles(stylesheet);

  const cutBorders = useTracerCutBorders();
  const { setCutBorders } = useTracerActions();

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Checkbox
          checked={cutBorders}
          onChange={() => setCutBorders(!cutBorders)}
        />
        <Text>Cut borders</Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: "flex-start",
    width: "100%",
    rowGap: theme.spacing.sm,
  },
  option: {
    flexDirection: "row",
    columnGap: theme.spacing.sm,
    alignItems: "center",
  },
}));
