import { Skeleton } from "moti/skeleton";
import { ComponentProps } from "react";
import { useStyles } from "react-native-unistyles";

interface SkeletonProps extends ComponentProps<typeof Skeleton> {}

export default function SkeletonLoader(props: SkeletonProps) {
  const { theme } = useStyles();

  return (
    <Skeleton
      width={"100%"}
      colors={theme.colors.skeleton}
      radius={0}
      {...props}
    />
  );
}
