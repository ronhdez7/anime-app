import { StatusBarStyle } from "expo-status-bar";
import lightTheme from "./light";

type ThemeColor = string;

export interface ThemeColorsConfig {
  name: string;
  statusBarStyle: StatusBarStyle;
  background: ThemeColor;
  neutral: ThemeColor;
  inactive: ThemeColor;
  primary: ThemeColor;
}

export interface ThemeSizesConfig {
  icon: number;
}

export interface Theme {
  colors: ThemeColorsConfig;
  sizes: ThemeSizesConfig;
}

const sizes: ThemeSizesConfig = { icon: 28 };

export const theme: Theme = {
  colors: lightTheme,
  sizes: sizes,
};
