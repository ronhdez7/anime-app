import { StatusBarStyle } from "expo-status-bar";
import lightColors from "./light";
import { UnistylesRegistry } from "react-native-unistyles";

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

// export type ThemeSizesConfig = typeof sizes;

// export type ThemeFontsConfig = typeof fonts;

// export interface Theme {
//   colors: ThemeColorsConfig;
//   sizes: ThemeSizesConfig;
//   fonts: ThemeFontsConfig;
//   spacing: typeof spacing;
//   radius: typeof radius;
// }

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

const lightTheme = {
  colors: lightColors,
  sizes,
  fonts,
  spacing,
  radius,
} as const;

// type AppBreakpoints = typeof breakpoints

type AppThemes = {
  light: typeof lightTheme;
};

// override library types
declare module "react-native-unistyles" {
  // export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry
  // .addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    // dark: darkTheme,
    // register other themes with unique names
  })
  .addConfig({
    // you can pass here optional config described below
    // adaptiveThemes: true
    initialTheme: "light",
  });
