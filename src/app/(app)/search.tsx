import { View } from "react-native";
import { theme } from "@/theme";
import SearchProvider from "@/stores/SearchStore";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import FiltersBottomSheet from "@/components/search/FiltersBottomSheet";

export default function SearchPage() {
  return (
    <SearchProvider>
      <View style={{ height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            padding: theme.sizes.padding.sm,
            columnGap: theme.sizes.gap.sm,
          }}
        >
          <SearchBar />
        </View>
        <SearchResults />

        <FiltersBottomSheet />
      </View>
    </SearchProvider>
  );
}
