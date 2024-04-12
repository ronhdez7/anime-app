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
  text: ThemeColor;
  secondary: ThemeColor;
  foreground: ThemeColor;
  overlay: ThemeColor;
}

export type ThemeSizesConfig = typeof sizes;

export type ThemeFontsConfig = typeof fonts;

export interface Theme {
  colors: ThemeColorsConfig;
  sizes: ThemeSizesConfig;
  fonts: ThemeFontsConfig;
}

const sizes = {
  icon: 28,
  text: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  radius: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  gap: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const;

const fonts = {
  inter: {
    light: "Inter-Light",
    medium: "Inter-Medium",
    bold: "Inter-Bold",
    black: "Inter-Black",
  },
} as const;

export const theme: Theme = {
  colors: lightTheme,
  sizes,
  fonts,
} as const;
