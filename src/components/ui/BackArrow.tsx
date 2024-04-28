import React from "react";
import IconButton, { IconButtonProps } from "./IconButton";
import { router } from "expo-router";

export default function BackArrow({
  ...props
}: Omit<IconButtonProps, "name" | "onPress">) {
  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return <IconButton name="arrow-left" onPress={goBack} {...props} />;
}
