import { ArrowLeftIcon } from "@/components/icons";
import IconButton from "@/components/ui/IconButton";
import { useRouter } from "expo-router";
import { memo } from "react";

export default memo( function BackButton() {
  const router = useRouter();

  function goBack() {
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
}
)