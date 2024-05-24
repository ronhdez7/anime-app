import { VerticalDotsIcon } from "@/components/icons";
import IconButton from "@/components/ui/IconButton";
import { GestureResponderEvent } from "react-native";

export default function SettingsButton() {
  function toggleSettings(e: GestureResponderEvent) {
    e.stopPropagation();
  }

  return (
    <IconButton onPress={toggleSettings}>
      <VerticalDotsIcon color="foreground" />
    </IconButton>
  );
}
