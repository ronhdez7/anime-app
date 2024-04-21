import useAnimeGenres from "@/queries/jikan/use-anime-genres";
import { useSearchGenres, useSearchActions } from "@/stores/SearchStore";
import { theme } from "@/theme";
import { View } from "react-native";
import Badge from "../ui/Badge";
import Text from "../ui/Text";
import LoadingView from "../ui/LoadingView";
import ReloadButton from "../ReloadButton";

export default function GenresSelection() {
  const genres = useSearchGenres();
  const { addGenre, removeGenre } = useSearchActions();

  const { data, error, refetch } = useAnimeGenres();

  return (
    <View style={{ rowGap: theme.sizes.gap.sm }}>
      <Text weight="bold">Genres</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.sizes.gap.xs,
        }}
      >
        {data ? (
          data.map((genre) => {
            const isSelected = genres.includes(genre.mal_id);

            return (
              <Badge
                style={isSelected && { backgroundColor: theme.colors.primary }}
                onPress={() =>
                  isSelected
                    ? removeGenre(genre.mal_id)
                    : addGenre(genre.mal_id)
                }
                key={genre.name}
              >
                <Text
                  size="sm"
                  style={{
                    color: isSelected
                      ? theme.colors.foreground
                      : theme.colors.primary,
                  }}
                >
                  {genre.name}
                </Text>
              </Badge>
            );
          })
        ) : error ? (
          <GenresFetchingError onReload={refetch} />
        ) : (
          <LoadingView />
        )}
      </View>
    </View>
  );
}

interface GenresErrorProps {
  onReload?: () => void;
}
function GenresFetchingError({ onReload }: GenresErrorProps) {
  return (
    <View style={{ flexDirection: "row", columnGap: 12 }}>
      <Text size="sm">Could not get genres</Text>
      {onReload && <ReloadButton onReload={onReload} size="xs" color="text" />}
    </View>
  );
}