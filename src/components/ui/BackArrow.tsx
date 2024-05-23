import React from "react";
import IconButton from "./IconButton";
import { router } from "expo-router";
import { ArrowLeftIcon } from "../icons";
import { IconProps } from "../icons/IconFactory";

interface BackArrowProps {
  color?: IconProps["color"];
}
export default function BackArrow({ color }: BackArrowProps) {
  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <IconButton onPress={goBack}>
      <ArrowLeftIcon size="sm" color={color} />
    </IconButton>
  );
}
