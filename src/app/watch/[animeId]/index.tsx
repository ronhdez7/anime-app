import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function RedirectToWatchPage() {
  const { animeId } = useLocalSearchParams();

  // redirect to episode where user left off
  // use watch history
  return <Redirect href={`/watch/${animeId}/1`} />;
}
