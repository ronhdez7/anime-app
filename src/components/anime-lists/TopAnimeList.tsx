import jikan from "@/lib/jikan";
import { useJikanInfiniteQuery } from "@/hooks/use-jikan-query";
import AnimeList, { AnimeListHeader } from "./AnimeList";
import { JikanAnimeData } from "@/types/jikan";

export default function TopAnimeList() {
  const query = useJikanInfiniteQuery<JikanAnimeData[]>({
    queryKey: ["anime-list", "top"],
    queryFn: ({ pageParam, signal }) =>
      jikan.getTopAnime({ page: pageParam }, { signal }),
  });

  return (
    <AnimeListHeader title="Top">
      <AnimeList query={query} />
    </AnimeListHeader>
  );
}
