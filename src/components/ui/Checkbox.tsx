import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { CheckMicroIcon } from "../icons/CheckMicroIcon";

interface CheckBoxProps {
  checked?: boolean;
  onChange?: () => void;
}

export default function Checkbox({ checked = false, onChange }: CheckBoxProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onChange?.()}>
        {checked ? (
          <View style={styles.check}>
            <CheckMicroIcon color="foreground" size="sm" />
          </View>
        ) : (
          <View style={styles.unchecked}></View>
        )}
      </Pressable>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: theme.sizes.icon.sm,
    height: theme.sizes.icon.sm,
    borderRadius: theme.radius.xs,
    overflow: "hidden",
  },
  check: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primary,
  },
  unchecked: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: theme.colors.inactive,
    borderRadius: theme.radius.xs,
  },
}));
