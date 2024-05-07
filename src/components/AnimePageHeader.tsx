import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BackArrow from "./ui/BackArrow";
import Text from "./ui/Text";
import { MALID } from "@/types/jikan";
import { useAnime } from "@/queries/use-anime";
import IconButton from "./ui/IconButton";

interface AnimeHeaderProps {
  id?: MALID;
}

export default function AnimePageHeader({ id }: AnimeHeaderProps) {
  const { styles } = useStyles(stylesheet);
  const anime = useAnime(id);

  const name = anime.data?.title;

  return (
    <View>
      <View style={styles.content}>
        {/* Left */}
        <View style={styles.left}>
          <BackArrow />
          {name && (
            <Text style={styles.title} size="lg" numberOfLines={1}>
              {name}
            </Text>
          )}
        </View>
        <View>
          <IconButton name="vertical-dots" />
        </View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    columnGap: theme.spacing.xs,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.sm,
    flex: 1,
  },
  title: { flex: 1 },
}));
