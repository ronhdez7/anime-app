import { Tabs } from "expo-router";
import {
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUserIcon,
} from "react-native-heroicons/solid";
import { theme } from "@/styles/theme";
import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassIcon,
  UserIcon as OutlineUserIcon,
} from "react-native-heroicons/outline";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.neutral },
        tabBarInactiveTintColor: theme.colors.inactive,
        tabBarActiveTintColor: theme.colors.primary,
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SolidHomeIcon color={color} size={theme.sizes.icon.md} />
            ) : (
              <OutlineHomeIcon color={color} size={theme.sizes.icon.md} />
            ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MagnifyingGlassIcon color={color} size={theme.sizes.icon.md} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SolidUserIcon color={color} size={theme.sizes.icon.md} />
            ) : (
              <OutlineUserIcon color={color} size={theme.sizes.icon.md} />
            ),
        }}
      />
    </Tabs>
  );
}
