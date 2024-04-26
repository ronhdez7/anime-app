import Featured from "@/components/anime-lists/Featured";
import ActionAnimeList from "@/components/anime-lists/ActionAnimeList";
import TopAnimeList from "@/components/anime-lists/TopAnimeList";
import { theme } from "@/styles/theme";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomePage() {
  const styles = stylesheet;

  return (
    <ScrollView>
      <View style={styles.featuredContainer}>
        <Featured />
      </View>
      <View style={styles.main}>
        <TopAnimeList />
        <ActionAnimeList />
      </View>
    </ScrollView>
  );
}

const stylesheet = StyleSheet.create({
  main: { padding: theme.spacing.xs, rowGap: theme.spacing.lg },
  featuredContainer: { aspectRatio: 17 / 24 },
});
