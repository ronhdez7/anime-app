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
import { ImageIcon } from "@/components/icons/ImageIcon";
import { Link } from "expo-router";

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
          <View style={styles.searchInputContainer}>
            <SearchBar />
            <Link href="/trace-modal">
              <ImageIcon />
            </Link>
          </View>

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
  searchInputContainer: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { height: 10, width: 10 },
    elevation: 10,
    flex: 1,
    backgroundColor: theme.colors.neutral,
    borderRadius: theme.radius.xs,
    flexDirection: "row",
    rowGap: theme.spacing.xs,
    alignItems: "center",
    paddingRight: theme.spacing.sm,
  },
}));
