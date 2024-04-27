import React from "react";
import { View } from "react-native";
import Text from "./ui/Text";
import { MaybeFullData } from "@/types";

interface AnimeScreenProps {
  anime: MaybeFullData;
}

export default function AnimeScreen({ anime }: AnimeScreenProps) {
  return (
    <View>
      <Text>AnimeScreen</Text>
      <Text>{anime.title}</Text>
      {anime.streaming?.map((l) => (
        <Text key={l.name}>{l.name}</Text>
      ))}
    </View>
  );
}
