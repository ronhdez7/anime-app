import { theme } from "@/theme";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import GenresList from "./GenresList";

export default function FiltersBottomSheet() {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.foreground }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
    >
      <BottomSheetScrollView style={{ padding: theme.sizes.padding.sm }}>
        <GenresList />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
