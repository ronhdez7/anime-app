import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import theme from "@/theme";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <Slot />
      <StatusBar style={theme.colors.statusBarStyle} />
    </SafeAreaView>
  );
}
