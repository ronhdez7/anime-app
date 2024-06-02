import React from "react";
import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="trace-modal"
        options={{ presentation: "modal", title: "Find Anime By Image" }}
      />
    </Stack>
  );
}
