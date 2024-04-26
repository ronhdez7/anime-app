import useAnimeGenres from "@/queries/jikan/use-anime-genres";
import { useSearchGenres, useSearchActions } from "@/stores/SearchStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { View } from "react-native";
import Text from "../ui/Text";
import LoadingView from "../ui/LoadingView";
import ReloadButton from "../ui/ReloadButton";
import FiltersList from "./FiltersList";

export default function GenresSelection() {
  const { styles } = useStyles(stylesheet);

  const genres = useSearchGenres();
  const { addGenre, removeGenre } = useSearchActions();

  const { data, error, refetch } = useAnimeGenres();

  return (
    <View style={styles.main}>
      <Text weight="bold">Genres</Text>

      {data ? (
        <FiltersList
          data={data.map((i) => ({
            name: i.name,
            value: i.mal_id,
            key: i.name,
          }))}
          isSelected={(item) => genres.includes(item.value)}
          onPress={(item, selected) =>
            selected ? removeGenre(item.value) : addGenre(item.value)
          }
        />
      ) : error ? (
        <GenresFetchingError onReload={refetch} />
      ) : (
        <LoadingView />
      )}
    </View>
  );
}

interface GenresErrorProps {
  onReload?: () => void;
}
function GenresFetchingError({ onReload }: GenresErrorProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.error}>
      <Text size="sm">Could not get genres</Text>
      {onReload && <ReloadButton onReload={onReload} size="xs" color="text" />}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { rowGap: theme.spacing.sm },
  error: { flexDirection: "row", columnGap: 12, alignItems: "center" },
}));
