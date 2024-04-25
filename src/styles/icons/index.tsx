import {
  HomeIcon as FilledHomeIcon,
  UserIcon as FilledUserIcon,
  ArrowPathIcon,
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
import { theme } from "../theme";

interface IconProps extends SvgProps {
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
  refresh: ArrowPathIcon,
  plus: PlusIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-down": ArrowDownIcon,
} satisfies IconRegister;

export interface IconControllerProps extends IconProps {
  name: keyof typeof icons;
}
export function Icon({ name, ...props }: IconControllerProps) {
  const ChosenIcon = icons[name];

  return (
    <ChosenIcon
      size={theme.sizes.icon.md}
      color={theme.colors.text}
      {...props}
    />
  );
}
