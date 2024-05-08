import { Tabs } from "expo-router";
import { Icon } from "@/styles/icons";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { theme } = useStyles();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.colors.neutral },
          tabBarInactiveTintColor: theme.colors.inactive,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabel: TabBarLabel,
          tabBarItemStyle: { columnGap: theme.spacing.lg },
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
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
    </SafeAreaView>
  );
}

function TabBarLabel(props: {
  focused: boolean;
  color: string;
  children: string;
}) {
  const { styles } = useStyles(stylesheet);
  const height = useSharedValue(0);

  if (props.focused) {
    height.value = withTiming(14);
  } else {
    height.value = withTiming(0);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <Text style={[styles.tabLabel, { color: props.color }]}>
        {props.children}
      </Text>
    </Animated.View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  tabLabel: {
    fontSize: {
      xs: theme.sizes.text.xs,
      sm: theme.sizes.text.sm,
    },
  },
}));
