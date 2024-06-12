import { View } from "react-native";
import Text from "../ui/Text";
import { TracerSearchResult } from "@/types/tracer";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import PlayerStoreProvider from "@/stores/PlayerStore";
import Player from "../player/Player";
import { Shadow } from "react-native-shadow-2";
import { convertSecondsToTime } from "@/lib/utils";
import { AnimeData } from "@/types";

interface TracerResultProps {
  result: TracerSearchResult;
  anime?: AnimeData;
}

export function TracerResult({ result, anime }: TracerResultProps) {
  const { styles } = useStyles(stylesheet);

  const title = anime?.title ?? result.filename;

  const clipStartTime = convertSecondsToTime(result.from);
  const clipEndTime = convertSecondsToTime(result.to);

  const similarity = result.similarity.toFixed(2);

  return (
    <View style={styles.container}>
      <Shadow distance={5}>
        <View style={styles.card}>
          <View>
            <PlayerStoreProvider>
              <Player
                source={{
                  uri: result.video,
                }}
                controls={{
                  disableBackButton: true,
                  disableSettingsButton: true,
                  disableFullscreenButton: true,
                  disableRewindButton: true,
                  disableForwardButton: true,
                }}
              />
            </PlayerStoreProvider>
          </View>

          <View style={styles.resultInfo}>
            <Text>{title}</Text>
          </View>
        </View>
      </Shadow>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
  },
  card: {
    width: "100%",
    borderRadius: theme.radius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.neutral,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  resultInfo: {
    padding: theme.spacing.sm,
  },
}));
