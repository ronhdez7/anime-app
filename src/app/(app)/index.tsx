import Featured from "@/components/anime-lists/Featured";
import ActionAnimeList from "@/components/anime-lists/ActionAnimeList";
import TopAnimeList from "@/components/anime-lists/TopAnimeList";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollView, View } from "react-native";

export default function HomePage() {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.page}
    >
      <Featured />
      <View style={styles.main}>
        <TopAnimeList />
        <ActionAnimeList />
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  page: { rowGap: 23 + theme.spacing.lg },
  main: { rowGap: theme.spacing.sm },
}));
