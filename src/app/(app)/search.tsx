import { StyleSheet, View } from "react-native";
import { theme } from "@/styles/theme";
import SearchProvider from "@/stores/SearchStore";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import FiltersBottomSheet from "@/components/search/FiltersBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";
import IconButton from "@/components/ui/IconButton";

export default function SearchPage() {
  const style = stylesheet;

  const bottomSheetRef = useRef<BottomSheet>(null);

  function openBottomSheet() {
    bottomSheetRef.current?.snapToIndex(2);
  }

  return (
    <SearchProvider>
      <View style={style.main}>
        <View style={style.searchHeader}>
          <SearchBar />

          <IconButton
            name="filters"
            size={theme.sizes.icon.sm}
            style={style.filterIcon}
            activeOpacity={0.75}
            onPress={openBottomSheet}
          />
        </View>
        <SearchResults />

        <FiltersBottomSheet ref={bottomSheetRef} />
      </View>
    </SearchProvider>
  );
}

const stylesheet = StyleSheet.create({
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
});
