import ActionAnimeList from "@/components/anime-lists/ActionAnimeList";
import TopAnimeList from "@/components/anime-lists/TopAnimeList";
import { theme } from "@/theme";
import { ScrollView, View } from "react-native";

export default function HomePage() {
  return (
    <ScrollView>
      <View
        style={{ padding: theme.sizes.padding.xs, rowGap: theme.sizes.gap.lg }}
      >
        <TopAnimeList />
        <ActionAnimeList />
      </View>
    </ScrollView>
  );
}
