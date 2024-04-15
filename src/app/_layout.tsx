import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import * as SplashScreen from "expo-splash-screen";
import useLoadAssets from "@/hooks/use-load-assets";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },

              // Status Bar
              statusBarTranslucent: true,
              statusBarStyle: theme.colors.statusBarStyle,
              statusBarHidden: false,
              statusBarAnimation: "slide",
            }}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
