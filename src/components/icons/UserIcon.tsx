import { UserIcon as OutlineUserIcon } from "react-native-heroicons/outline";
import { UserIcon as SolidUserIcon } from "react-native-heroicons/solid";
import { createIcon } from "./IconFactory";

export const UserOutlineIcon = createIcon(OutlineUserIcon);
export const UserFilledIcon = createIcon(SolidUserIcon);
