import { View } from "react-native";
import React from "react";
import Text from "@/components/ui/Text";
import { Link } from "expo-router";

export default function ProfilePage() {
  return (
    <View>
      <Text>ProfilePage</Text>
      <Link href={"/test"}>
        <Text>Go to Testing Page</Text>
      </Link>
    </View>
  );
}
