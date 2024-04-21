import { TouchableOpacity, View } from "react-native";
import { theme } from "@/theme";
import SearchProvider from "@/stores/SearchStore";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import FiltersBottomSheet from "@/components/search/FiltersBottomSheet";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";

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

          <TouchableOpacity
            activeOpacity={0.75}
            style={{
              padding: theme.sizes.padding.sm,
              backgroundColor: theme.colors.neutral,
              borderRadius: theme.sizes.radius.xs,
              elevation: 10,
            }}
            onPress={openBottomSheet}
          >
            <AdjustmentsHorizontalIcon
              color={theme.colors.text}
              size={theme.sizes.icon.sm}
            />
          </TouchableOpacity>
        </View>
        <SearchResults />

        <FiltersBottomSheet ref={bottomSheetRef} />
      </View>
    </SearchProvider>
  );
}
