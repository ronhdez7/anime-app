import IconButton from "@/components/ui/IconButton";
import { ExpandIcon } from "@/components/icons";
import { GestureResponderEvent } from "react-native";
import { usePlayerActions, usePlayerFullscreen } from "@/stores/PlayerStore";
import { CollapseIcon } from "@/components/icons/CollapseIcon";

export default function FullscreenButton() {
  const fullscreen = usePlayerFullscreen();
  const { setFullscreen } = usePlayerActions();

  function toggleFullscreen(e: GestureResponderEvent) {
    e.stopPropagation();
    setFullscreen(!fullscreen);
  }

  const Icon = fullscreen ? CollapseIcon : ExpandIcon;

  return (
    <IconButton onPress={toggleFullscreen}>
      <Icon color="foreground" size="sm" />
    </IconButton>
  );
}
