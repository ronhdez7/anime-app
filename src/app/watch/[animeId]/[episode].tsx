import React from "react";
import { useLocalSearchParams } from "expo-router";
import Text from "@/components/ui/Text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EpisodePage() {
  const params = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>{JSON.stringify(params)}</Text>
    </SafeAreaView>
  );
}
