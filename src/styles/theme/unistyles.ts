import { UnistylesRegistry } from "react-native-unistyles";
import { lightTheme } from "./config";

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
  })
  .addConfig({
    initialTheme: "light",
  });
