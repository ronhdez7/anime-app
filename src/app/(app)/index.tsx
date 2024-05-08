import Featured from "@/components/anime-lists/Featured";
import ActionAnimeList from "@/components/anime-lists/ActionAnimeList";
import TopAnimeList from "@/components/anime-lists/TopAnimeList";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollView, View } from "react-native";

export default function HomePage() {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView>
      <Featured />
      <View style={styles.main}>
        <TopAnimeList />
        <ActionAnimeList />
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { padding: theme.spacing.sm, rowGap: theme.spacing.lg },
  // featuredContainer: { aspectRatio: theme.config.imageAspectRatio },
}));
