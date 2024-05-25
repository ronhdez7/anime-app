import IconButton from "@/components/ui/IconButton";
import { ExpandIcon } from "@/components/icons";
import { GestureResponderEvent } from "react-native";
import { usePlayerActions, usePlayerFullscreen } from "@/stores/PlayerStore";
import { CollapseIcon } from "@/components/icons/CollapseIcon";
import { memo } from "react";

export default memo(function FullscreenButton() {
  const fullscreen = usePlayerFullscreen();
  const { setFullscreen, setShowControls } = usePlayerActions();

  function handlePress(e: GestureResponderEvent) {
    e.stopPropagation();
    setFullscreen(!fullscreen);
    setShowControls(true);
  }

  const Icon = fullscreen ? CollapseIcon : ExpandIcon;

  return (
    <IconButton onPress={handlePress}>
      <Icon color="foreground" size="sm" />
    </IconButton>
  );
});
