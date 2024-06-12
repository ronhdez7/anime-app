import "@/styles/theme";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { useStyles } from "react-native-unistyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { useLoad } from "@/queries/loaders";
import { MenuProvider } from "react-native-popup-menu";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useStyles();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MenuProvider>
          <LoadAssets>
            <SafeAreaProvider
              style={{ flex: 1 }}
              onTouchStart={Keyboard.dismiss}
            >
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: theme.colors.background },

                  // Status Bar
                  statusBarTranslucent: true,
                  statusBarStyle: theme.colors.statusBarStyle,
                  statusBarHidden: false,
                  statusBarAnimation: "slide",
                }}
              />
            </SafeAreaProvider>
          </LoadAssets>
        </MenuProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

function LoadAssets({ children }: { children?: React.ReactNode }) {
  const loaded = useLoad();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return children;
}
