import jikan from "@/lib/jikan";
import { useJikanInfiniteQuery } from "@/hooks/use-jikan-query";
import { AnimeListView } from "./AnimeList";

export default function TopAnimeList() {
  const query = useJikanInfiniteQuery({
    queryKey: ["anime-list", "top"],
    queryFn: ({ pageParam, signal }) =>
      jikan.getTopAnime({ page: pageParam }, { signal }),
  });

  return <AnimeListView title="Top" query={query} />;
}
