import { Svg, Path } from "react-native-svg";
import { IconSvgProps, createIcon } from "./IconFactory";
import { ReactNode } from "react";

function Icon({ size, ...props }: IconSvgProps): ReactNode {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <Path d="M3 3v5h5" />
    </Svg>
  );
}

// lucide rotate-ccw
export const RefreshIcon = createIcon(Icon);
