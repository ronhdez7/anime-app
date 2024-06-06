import { View } from "react-native";
import React from "react";
import WatchPlayer from "./WatchPlayer";
import { ID } from "@/types";

interface WatchScreenProps {
  animeId: ID;
  episodeNumber?: number;
}

export default function WatchScreen({
  animeId,
  episodeNumber = 1,
}: WatchScreenProps) {
  return (
    <View>
      <WatchPlayer animeId={animeId} episodeNumber={episodeNumber} />
    </View>
  );
}
