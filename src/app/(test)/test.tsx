import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestingPage() {
  const { styles } = useStyles(stylesheet);

  function goBack() {
    router.navigate("/");
  }

  return (
    <SafeAreaView>
      <Text>TestingPage</Text>
      <TouchableOpacity onPress={goBack} style={styles.button}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  button: { padding: theme.spacing["2xl"], backgroundColor: "skyblue" },
}));
