import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "@/styles/theme";
import { router } from "expo-router";

export default function TestingPage() {
  function goBack() {
    router.navigate("/");
  }

  return (
    <View>
      <Text>TestingPage</Text>
      <TouchableOpacity
        onPress={goBack}
        style={{ padding: theme.sizes.padding.lg, backgroundColor: "skyblue" }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
