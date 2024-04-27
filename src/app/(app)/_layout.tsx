import { Tabs } from "expo-router";
import { Icon } from "@/styles/icons";
import { useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AppLayout() {
  const { theme } = useStyles();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.neutral },
        tabBarInactiveTintColor: theme.colors.inactive,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabel: TabBarLabel,
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

function TabBarLabel(props: {
  focused: boolean;
  color: string;
  children: string;
}) {
  const height = useSharedValue(0);

  if (props.focused) {
    height.value = withTiming(14);
  } else {
    height.value = withTiming(0);
  }

  const styles = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Animated.View style={styles}>
      <Text size="xs" style={{ color: props.color }}>
        {props.children}
      </Text>
    </Animated.View>
  );
}
