import React from "react";
import IconButton from "./IconButton";
import { ArrowLeftIcon } from "../icons";
import { IconProps } from "../icons/IconFactory";
import { useRouter } from "expo-router";

interface BackArrowProps {
  color?: IconProps["color"];
}
export default function BackArrow({ color }: BackArrowProps) {
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
      <ArrowLeftIcon size="sm" color={color} />
    </IconButton>
  );
}
