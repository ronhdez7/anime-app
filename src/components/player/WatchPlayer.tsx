import { View, Text } from "react-native";
import React from "react";
import { MALID } from "@/types/jikan";

interface WatchPlayerProps {
  animeId: MALID;
  episodeNumber: number;
}

export default function WatchPlayer({
  animeId,
  episodeNumber,
}: WatchPlayerProps) {
  return (
    <View>
      <Text>WatchPlayer</Text>
    </View>
  );
}
