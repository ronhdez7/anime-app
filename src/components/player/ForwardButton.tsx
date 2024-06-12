import { GestureResponderEvent, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ControlProps } from "./Controls";
import IconButton from "../ui/IconButton";
import { ForwardIcon } from "../icons/ForwardIcon";

export default function ForwardButton({ onPress, player }: ControlProps) {
  const { styles } = useStyles(stylesheet);

  function forward(e: GestureResponderEvent) {
    onPress?.(e);
    player.seekBy(10);
  }

  return (
    <View>
      <IconButton onPress={forward}>
        <ForwardIcon color="foreground" />
      </IconButton>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({}));
