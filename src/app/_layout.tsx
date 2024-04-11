import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import * as SplashScreen from "expo-splash-screen";
import useLoadAssets from "@/hooks/use-load-assets";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

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
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={{ backgroundColor: theme.colors.background, flex: 1 }}
      >
        <Slot />
        <StatusBar
          style={theme.colors.statusBarStyle}
          translucent
          animated
          hideTransitionAnimation="slide"
        />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
