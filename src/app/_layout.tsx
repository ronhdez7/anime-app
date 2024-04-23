import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/styles/theme";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Keyboard } from "react-native";

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
          onTouchStart={Keyboard.dismiss}
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

function useLoadAssets() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Light": require("../../assets/fonts/Inter/Inter-Light.otf"),
    "Inter-Medium": require("../../assets/fonts/Inter/Inter-Medium.otf"),
    "Inter-Bold": require("../../assets/fonts/Inter/Inter-Bold.otf"),
    "Inter-Black": require("../../assets/fonts/Inter/Inter-Black.otf"),
  });

  // For some reason, in some devices requests to the api fail.
  // So this dummy request to a verified api is needed.
  // axios.get("https://jsonplaceholder.typicode.com/posts/1");

  return [fontsLoaded, fontError];
}
