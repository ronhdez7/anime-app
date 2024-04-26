import { createStyleSheet, useStyles } from "react-native-unistyles";
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
import ReloadButton from "../ui/ReloadButton";

export default forwardRef<BottomSheet>(function FiltersBottomSheet(_, ref) {
  const { styles } = useStyles(stylesheet);

  const snapPoints = useMemo(() => [25, "25%", "50%", "90%"], []);
  const { resetFilters } = useSearchActions();

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.indicator}
      enablePanDownToClose
      index={-1}
      handleComponent={({ animatedIndex, animatedPosition }) => (
        <View style={styles.handle}>
          <BottomSheetHandle
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
          <ReloadButton
            onReload={resetFilters}
            color="text"
            size="sm"
            style={styles.resetButton}
          />
        </View>
      )}
    >
      <BottomSheetScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <GenresSelection />
        <TypesSelection />
        <StatusSelection />
        <OrderSelection />
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  background: { backgroundColor: theme.colors.foreground },
  indicator: { backgroundColor: theme.colors.text },
  handle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  resetButton: {
    top: 0,
    right: 0,
    padding: theme.spacing.xs,
    position: "absolute",
    alignSelf: "flex-end",
  },
  content: {
    padding: theme.spacing.sm,
    flex: 1,
  },
  contentContainer: { rowGap: theme.spacing.md },
}));
