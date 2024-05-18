import { View } from "react-native";
import React from "react";
import { MALID } from "@/types/jikan";
import WatchPlayer from "./WatchPlayer";

interface WatchScreenProps {
  animeId: MALID;
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
