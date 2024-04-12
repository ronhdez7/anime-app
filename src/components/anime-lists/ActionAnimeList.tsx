import jikan from "@/lib/jikan";
import { useJikanQuery } from "@/hooks/use-jikan-query";
import AnimeList, { AnimeListHeader } from "./AnimeList";

export default function ActionAnimeList() {
  const query = useJikanQuery({
    queryKey: ["anime-list", "action"],
    queryFn: ({ signal }) => jikan.getAnimeByGenre(1, { signal }),
  });

  return (
    <AnimeListHeader title="Action">
      <AnimeList query={query} />
    </AnimeListHeader>
  );
}
