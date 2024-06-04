import { GestureResponderEvent, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ControlProps } from "./Controls";
import IconButton from "../ui/IconButton";
import { ExpandIcon } from "../icons";
import { usePlayerActions, usePlayerFullscreen } from "@/stores/PlayerStore";
import { CollapseIcon } from "../icons/CollapseIcon";

export default function FullscreenButton({ onPress }: ControlProps) {
  const { styles } = useStyles(stylesheet);

  const fullscreen = usePlayerFullscreen();
  const { setFullscreen } = usePlayerActions();

  const FullscreenIcon = fullscreen ? CollapseIcon : ExpandIcon;

  function toggleFullscreen(e: GestureResponderEvent) {
    onPress?.(e);
    setFullscreen(!fullscreen);
  }

  return (
    <View>
      <IconButton onPress={toggleFullscreen}>
        <FullscreenIcon color="foreground" size="sm" />
      </IconButton>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({}));
