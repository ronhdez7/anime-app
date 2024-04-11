import { useFonts } from "expo-font";

export default function useLoadAssets() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Light": require("../../assets/fonts/Inter/Inter-Light.otf"),
    "Inter-Medium": require("../../assets/fonts/Inter/Inter-Medium.otf"),
    "Inter-Bold": require("../../assets/fonts/Inter/Inter-Bold.otf"),
    "Inter-Black": require("../../assets/fonts/Inter/Inter-Black.otf"),
  });

  return [fontsLoaded, fontError];
}
