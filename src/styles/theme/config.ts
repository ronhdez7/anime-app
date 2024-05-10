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
  skeleton: ThemeColor[];
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
    smd: 14,
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
  config: {
    imageAspectRatio: 17 / 24,
  },
} as const;

export const lightTheme = {
  colors: lightColors,
  ...themeConstants,
} as const;

export type ThemeConfig = typeof themeConstants & { colors: ThemeColorsConfig };

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;
