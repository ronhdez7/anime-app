import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import AnimeScreen from "@/components/AnimeScreen";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import AnimePageHeader from "@/components/AnimePageHeader";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import AnimeDetails from "@/components/AnimeDetails";

type Params = {
  id: string;
};

export default function AnimePage() {
  const { id } = useLocalSearchParams<Params>();
  const { styles } = useStyles(stylesheet);

  if (!id) {
    return (
      <View style={styles.error}>
        <Text>Sorry, this page does not know which anime to load</Text>
        <Text>Please try going back and navigating back to this page</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <AnimePageHeader id={id} />
      <AnimeScreen id={id} />
      <View style={styles.bottomNav}>
        <Link href={`/watch/${id}/1`} asChild>
          <Button style={styles.playButton}>
            <Text color="foreground" style={styles.watchText}>
              Watch
            </Text>
          </Button>
        </Link>
        <IconButton name="plus" color="primary" style={styles.saveButton} />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  page: { flex: 1 },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    columnGap: theme.spacing.sm,
  },
  playButton: {
    flex: 1,
    height: "100%",
  },
  watchText: {
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: theme.colors.neutral,
    borderRadius: theme.radius.md,
  },
}));
