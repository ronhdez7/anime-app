import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router } from "expo-router";

export default function TestingPage() {
  const {styles} = useStyles(stylesheet)

  function goBack() {
    router.navigate("/");
  }

  return (
    <View>
      <Text>TestingPage</Text>
      <TouchableOpacity
        onPress={goBack}
        style={styles.button}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  button: { padding: theme.spacing["2xl"], backgroundColor: "skyblue" }
}))