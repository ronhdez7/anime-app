import { StatusBarStyle } from "expo-status-bar";
import { ColorValue } from "react-native";

type ThemeColor = ColorValue;

export interface ThemeColorsConfig {
  name: string;
  background: ThemeColor;
  statusBarStyle: StatusBarStyle;
}

export interface Theme {
  colors: ThemeColorsConfig;
}
