import { View, Text } from "react-native";
import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { JikanError } from "@/types/jikan";

interface Props {
  query: UseQueryResult<any[], AxiosError<JikanError>>;
}

export default function AnimeList({ query }: Props) {
  return (
    <View>
      <Text>AnimeList</Text>
    </View>
  );
}
