import { GestureResponderEvent, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ControlProps } from "./Controls";
import IconButton from "../ui/IconButton";
import { RewindIcon } from "../icons/RewindIcon";

export default function RewindButton({ onPress, player }: ControlProps) {
  const { styles } = useStyles(stylesheet);

  function rewind(e: GestureResponderEvent) {
    onPress?.(e);
    player.seekBy(-10);
  }

  return (
    <View>
      <IconButton onPress={rewind}>
        <RewindIcon color="foreground" />
      </IconButton>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({}));
