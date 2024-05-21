import { View } from "react-native";
import React, { PropsWithChildren, memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeArea({ children }: PropsWithChildren) {
  const { bottom, left, right, top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
        paddingTop: top,
      }}
      children={children}
    />
  );
}
