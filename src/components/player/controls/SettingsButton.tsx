import { SettingsIcon } from "@/components/icons/SettingsIcon";
import IconButton from "@/components/ui/IconButton";
import { usePlayerActions } from "@/stores/PlayerStore";
import { memo } from "react";
import { GestureResponderEvent } from "react-native";

export default memo(function SettingsButton() {
  const { setShowControls } = usePlayerActions();

  function handlePress(e: GestureResponderEvent) {
    e.stopPropagation();
    setShowControls(true);
  }

  return (
    <IconButton onPress={handlePress}>
      <SettingsIcon color="foreground" />
    </IconButton>
  );
});
