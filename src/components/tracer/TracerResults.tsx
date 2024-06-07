import { TracerSearchResponse } from "@/types/tracer";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import Player from "../player/Player";
import PlayerStoreProvider from "@/stores/PlayerStore";
import { convertSecondsToTime } from "@/lib/utils";

interface TracerResultsProps {
  response: TracerSearchResponse;
}

export default function TracerResults({ response }: TracerResultsProps) {
  const { styles } = useStyles(stylesheet);

  if (response.error) {
    return <Text>Error: {response.error}</Text>;
  }

  const results = response.result;
  const result = results?.at(0);

  if (!results || !result) {
    return <Text>No results found</Text>;
  }

  const clipStartTime = convertSecondsToTime(result.from);
  const clipEndTime = convertSecondsToTime(result.to);

  const similarity = result.similarity.toFixed(2);

  return (
    <View style={styles.container}>
      <View>
        <PlayerStoreProvider>
          <Player source={{ uri: result.video }} />
        </PlayerStoreProvider>
      </View>
      <View>
        <Text>
          {clipStartTime} - {clipEndTime}
        </Text>
        <Text>{similarity}%</Text>
      </View>

      <View>
        <Text>Anime Info</Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    rowGap: theme.spacing.sm,
  },
}));
