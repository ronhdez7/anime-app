import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import * as SplashScreen from "expo-splash-screen";
import useLoadAssets from "@/hooks/use-load-assets";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [assetsLoaded, assetsError] = useLoadAssets();

  useEffect(() => {
    if (assetsLoaded || assetsError) {
      SplashScreen.hideAsync();
    }
  }, [assetsLoaded, assetsError]);

  if (!assetsLoaded && !assetsError) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Slot />
      <StatusBar
        style={theme.colors.statusBarStyle}
        translucent
        animated
        hideTransitionAnimation="slide"
      />
    </SafeAreaView>
  );
}
