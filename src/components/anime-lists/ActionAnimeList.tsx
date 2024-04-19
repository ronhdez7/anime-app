import jikan from "@/lib/jikan";
import { useJikanInfiniteQuery } from "@/hooks/use-jikan-query";
import { AnimeListView } from "./AnimeList";

export default function ActionAnimeList() {
  const query = useJikanInfiniteQuery({
    queryKey: ["anime-list", "action"],
    queryFn: ({ pageParam, signal }) =>
      jikan.getAnimeSearch({ genres: [1], page: pageParam }, { signal }),
  });

  return <AnimeListView title="Action" query={query} />;
}
