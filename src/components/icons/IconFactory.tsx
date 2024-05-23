import { ReactNode } from "react";
import { NumberProp, SvgProps } from "react-native-svg";
import { useStyles } from "react-native-unistyles";
import { ThemeConfig } from "../../styles/theme";

export interface IconSvgProps extends SvgProps {
  size?: NumberProp;
}

export type IconSvg = (props: IconSvgProps) => ReactNode;

export interface IconProps extends IconSvgProps {
  size?: keyof ThemeConfig["sizes"]["icon"];
  color?: keyof Omit<ThemeConfig["colors"], "skeleton">;
}

interface IconFactoryProps extends IconProps {
  Icon: IconSvg;
}
export function IconFactory({
  Icon,
  size = "md",
  color = "text",
  ...props
}: IconFactoryProps) {
  const { theme } = useStyles();

  return (
    <Icon
      size={theme.sizes.icon[size]}
      color={theme.colors[color]}
      {...props}
    />
  );
}

export function createIcon(Icon: IconSvg) {
  return (props: IconProps) => <IconFactory Icon={Icon} {...props} />;
}
