import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BackArrow from "../ui/BackArrow";
import TracerMenu from "./TracerMenu";

export default function TracerHeader() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <BackArrow />

      <TracerMenu />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    columnGap: theme.spacing.xs,
    zIndex: 10,
  },
}));
