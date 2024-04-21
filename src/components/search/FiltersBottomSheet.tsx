import { theme } from "@/theme";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import GenresSelection from "./GenresSelection";
import TypesSelection from "./TypesSelection";
import StatusSelection from "./StatusSelection";
import OrderSelection from "./OrderSelection";
import { View } from "react-native";
import { useSearchActions } from "@/stores/SearchStore";
import ReloadButton from "../ReloadButton";

export default forwardRef<BottomSheet>(function FiltersBottomSheet(_, ref) {
  const snapPoints = useMemo(() => [25, "25%", "50%", "90%"], []);
  const { resetFilters } = useSearchActions();

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.foreground }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      enablePanDownToClose
      index={-1}
      handleComponent={({ animatedIndex, animatedPosition }) => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <BottomSheetHandle
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
          <ReloadButton
            onReload={resetFilters}
            color="text"
            size="sm"
            style={{
              top: 0,
              right: 0,
              padding: theme.sizes.padding.xs,
              position: "absolute",
              alignSelf: "flex-end",
            }}
          />
        </View>
      )}
    >
      <BottomSheetScrollView
        style={{
          padding: theme.sizes.padding.sm,
          flex: 1,
        }}
        contentContainerStyle={{ rowGap: theme.sizes.gap.md }}
      >
        <GenresSelection />
        <TypesSelection />
        <StatusSelection />
        <OrderSelection />
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
