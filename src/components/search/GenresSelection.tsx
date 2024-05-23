import useAnimeGenres from "@/queries/use-anime-genres";
import { useSearchGenres, useSearchActions } from "@/stores/SearchStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import LoadingView from "../ui/LoadingView";
import FiltersList from "./FiltersList";
import { RefreshIcon } from "@/components/icons/RefreshIcon";

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
          data={data
            .filter((i) => i.type === "GENRE")
            .map((i) => ({
              name: i.name,
              value: i.id,
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
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.error}>
      <Text size="sm">Could not get genres</Text>
      {onReload && (
        <TouchableOpacity onPress={onReload} style={styles.reloadButton}>
          <RefreshIcon color="text" size="md" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { rowGap: theme.spacing.sm },
  error: { flexDirection: "row", columnGap: 12, alignItems: "center" },
  reloadButton: { padding: theme.spacing.sm, borderRadius: 10000 },
}));
