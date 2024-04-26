import {
  HomeIcon as FilledHomeIcon,
  UserIcon as FilledUserIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassIcon,
  UserIcon as OutlineUserIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import { ArrowDownIcon, ArrowUpIcon } from "react-native-heroicons/mini";

import { NumberProp, SvgProps } from "react-native-svg";
import RefreshIcon from "./RefreshIcon";
import { useStyles } from "react-native-unistyles";

export interface IconProps extends SvgProps {
  size?: NumberProp;
}
type IconComponent = (props: IconProps) => JSX.Element;
type IconRegister = Record<string, IconComponent>;

const icons = {
  "home-outline": OutlineHomeIcon,
  "home-filled": FilledHomeIcon,
  "user-filled": FilledUserIcon,
  "user-outline": OutlineUserIcon,
  search: MagnifyingGlassIcon,
  filters: AdjustmentsHorizontalIcon,
  refresh: RefreshIcon,
  plus: PlusIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-down": ArrowDownIcon,
} satisfies IconRegister;

export interface IconControllerProps extends IconProps {
  name: keyof typeof icons;
}
export function Icon({ name, ...props }: IconControllerProps) {
  const { theme } = useStyles();
  const ChosenIcon = icons[name];

  return (
    <ChosenIcon
      size={theme.sizes.icon.md}
      color={theme.colors.text}
      {...props}
    />
  );
}
