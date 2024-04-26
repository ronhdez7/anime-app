import { Tabs } from "expo-router";
import { Icon } from "@/styles/icons";
import { useStyles } from "react-native-unistyles";

export default function AppLayout() {
  const { theme } = useStyles();

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
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home-filled" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "user-filled" : "user-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
