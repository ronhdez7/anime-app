import { TouchableOpacity, View } from "react-native";
import { theme } from "@/styles/theme";
import SearchProvider from "@/stores/SearchStore";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import FiltersBottomSheet from "@/components/search/FiltersBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";
import { Icon } from "@/styles/icons";
import IconButton from "@/components/ui/IconButton";

export default function SearchPage() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function openBottomSheet() {
    bottomSheetRef.current?.snapToIndex(2);
  }

  return (
    <SearchProvider>
      <View style={{ height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            padding: theme.sizes.padding.sm,
            columnGap: theme.sizes.gap.sm,
            alignItems: "center",
          }}
        >
          <SearchBar />

          <IconButton
            name="filters"
            size={theme.sizes.icon.sm}
            style={{
              backgroundColor: theme.colors.neutral,
              borderRadius: theme.sizes.radius.xs,
              elevation: 10,
              shadowColor: theme.colors.shadow,
            }}
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
