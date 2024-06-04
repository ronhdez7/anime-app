import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import IconButton from "../ui/IconButton";
import { SettingsIcon } from "../icons/SettingsIcon";
import { ControlProps } from "./Controls";

export default function SettingsButton({ onPress }: ControlProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View>
      <IconButton onPress={onPress}>
        <SettingsIcon color="foreground" />
      </IconButton>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({}));
