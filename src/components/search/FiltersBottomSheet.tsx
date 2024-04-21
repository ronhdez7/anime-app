import { theme } from "@/theme";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import GenresList from "./GenresList";
import TypesList from "./TypesList";
import StatusList from "./StatusList";

export default forwardRef<BottomSheet>(function FiltersBottomSheet(_, ref) {
  const snapPoints = useMemo(() => [25, "25%", "50%", "90%"], []);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.foreground }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      enablePanDownToClose
      index={-1}
    >
      <BottomSheetScrollView
        style={{
          padding: theme.sizes.padding.sm,
          flex: 1,
        }}
        contentContainerStyle={{ rowGap: theme.sizes.gap.md }}
      >
        <GenresList />
        <TypesList />
        <StatusList />
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
