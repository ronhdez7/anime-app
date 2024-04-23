import Featured from "@/components/anime-lists/Featured";
import ActionAnimeList from "@/components/anime-lists/ActionAnimeList";
import TopAnimeList from "@/components/anime-lists/TopAnimeList";
import { theme } from "@/styles/theme";
import { ScrollView, View } from "react-native";

export default function HomePage() {
  return (
    <ScrollView>
      <View style={{ aspectRatio: 17 / 24 }}>
        <Featured />
      </View>
      <View
        style={{ padding: theme.sizes.padding.xs, rowGap: theme.sizes.gap.lg }}
      >
        <TopAnimeList />
        <ActionAnimeList />
      </View>
    </ScrollView>
  );
}
