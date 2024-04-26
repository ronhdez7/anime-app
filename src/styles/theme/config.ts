import { StatusBarStyle } from "expo-status-bar";
import lightColors from "./light";

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
  shadow: ThemeColor;
}

const sizes = {
  icon: {
    xs: 20,
    sm: 24,
    md: 28,
    lg: 32,
    xl: 36,
  },
  text: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
} as const;

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
} as const;

const radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

const fonts = {
  inter: {
    light: "Inter-Light",
    medium: "Inter-Medium",
    bold: "Inter-Bold",
    black: "Inter-Black",
  },
} as const;

const themeConstants = {
  sizes,
  fonts,
  spacing,
  radius,
} as const

export const lightTheme = {
  colors: lightColors,
  ...themeConstants
} as const;

export type ThemeConfig = typeof themeConstants & { colors: ThemeColorsConfig }
