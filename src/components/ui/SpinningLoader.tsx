import { ComponentProps } from "react";
import { ActivityIndicator } from "react-native";
import { useStyles } from "react-native-unistyles";
import { IconProps } from "../icons";

interface SpinningLoaderProps
  extends Omit<ComponentProps<typeof ActivityIndicator>, "size" | "color"> {
  size?: IconProps["size"];
  color?: IconProps["color"];
}
export default function SpinningLoader({
  size = "md",
  color = "text",
  ...props
}: SpinningLoaderProps) {
  const { theme } = useStyles();

  return (
    <ActivityIndicator
      size={theme.sizes.icon[size]}
      color={theme.colors[color]}
      {...props}
    />
  );
}
