import { View } from "react-native";
import React, { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeArea({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
}
