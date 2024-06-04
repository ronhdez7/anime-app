import { ArrowLeftIcon } from "@/components/icons";
import IconButton from "@/components/ui/IconButton";
import { useRouter } from "expo-router";
import { memo } from "react";
import { ControlProps } from "./Controls";
import { GestureResponderEvent } from "react-native";

export default memo(function BackButton({ onPress }: ControlProps) {
  const router = useRouter();

  function goBack(e: GestureResponderEvent) {
    onPress?.(e);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <IconButton onPress={goBack}>
      <ArrowLeftIcon color="foreground" />
    </IconButton>
  );
});
