import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import SearchProvider from "@/stores/SearchStore";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import FiltersBottomSheet from "@/components/search/FiltersBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";
import IconButton from "@/components/ui/IconButton";
import { FiltersIcon } from "@/components/icons";

export default function SearchPage() {
  const { styles } = useStyles(stylesheet);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function openBottomSheet() {
    bottomSheetRef.current?.snapToIndex(2);
  }

  return (
    <SearchProvider>
      <View style={styles.main}>
        <View style={styles.searchHeader}>
          <SearchBar />

          <IconButton onPress={openBottomSheet} style={styles.filterIcon}>
            <FiltersIcon size="sm" />
          </IconButton>
        </View>
        <SearchResults />

        <FiltersBottomSheet ref={bottomSheetRef} />
      </View>
    </SearchProvider>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { height: "100%" },
  searchHeader: {
    flexDirection: "row",
    padding: theme.spacing.sm,
    columnGap: theme.spacing.sm,
    alignItems: "center",
  },
  filterIcon: {
    backgroundColor: theme.colors.neutral,
    borderRadius: theme.radius.xs,
    elevation: 10,
    shadowColor: theme.colors.shadow,
  },
}));
