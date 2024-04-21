import { theme } from "@/theme";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {}

export default forwardRef<TouchableOpacity, Props>(function Badge(
  { style, ...props },
  ref
) {
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.75}
      style={[
        {
          borderWidth: 1,
          borderColor: theme.colors.primary,
          backgroundColor: "transparent",
          borderRadius: 10000,
          paddingHorizontal: theme.sizes.padding.sm,
          paddingVertical: theme.sizes.padding.sm,
        },
        style,
      ]}
      {...props}
    />
  );
});
