import { Tabs } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SafeArea from "@/components/ui/SafeArea";
import {
  HomeFilledIcon,
  HomeOutlineIcon,
  SearchIcon,
  UserFilledIcon,
  UserOutlineIcon,
} from "@/components/icons";

export default function AppLayout() {
  const { theme } = useStyles();

  const activeColor = "primary";
  const inactiveColor = "inactive";

  return (
    <SafeArea>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.neutral,
            margin: theme.spacing.sm,
            borderRadius: theme.radius.md,
          },
          tabBarLabel: TabBarLabel,
          tabBarItemStyle: { columnGap: theme.spacing.lg },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
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
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeFilledIcon color={focused ? activeColor : inactiveColor} />
              ) : (
                <HomeOutlineIcon
                  color={focused ? activeColor : inactiveColor}
                />
              ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <SearchIcon color={focused ? activeColor : inactiveColor} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <UserFilledIcon color={focused ? activeColor : inactiveColor} />
              ) : (
                <UserOutlineIcon
                  color={focused ? activeColor : inactiveColor}
                />
              ),
          }}
        />
      </Tabs>
    </SafeArea>
  );
}

function TabBarLabel(props: {
  focused: boolean;
  color: string;
  children: string;
}) {
  const { styles, theme } = useStyles(stylesheet);
  const height = useSharedValue(props.focused ? 14 : 0);

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
      <Text
        style={[styles.tabLabel, { color: (theme.colors as any)[props.color] }]}
      >
        {props.children}
      </Text>
    </Animated.View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  tabLabel: {
    fontSize: theme.sizes.text.xs,
  },
}));
