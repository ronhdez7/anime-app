import Featured from "@/components/anime-lists/Featured";
import ActionAnimeList from "@/components/anime-lists/ActionAnimeList";
import TopAnimeList from "@/components/anime-lists/TopAnimeList";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollView, View } from "react-native";
import SafeArea from "@/components/ui/SafeArea";

export default function HomePage() {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeArea>
      <ScrollView>
        <View style={styles.featuredContainer}>
          <Featured />
        </View>
        <View style={styles.main}>
          <TopAnimeList />
          <ActionAnimeList />
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { padding: theme.spacing.xs, rowGap: theme.spacing.lg },
  featuredContainer: { aspectRatio: 17 / 24 },
}));
