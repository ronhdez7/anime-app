import jikan from "@/lib/jikan";
import { useJikanInfiniteQuery } from "@/hooks/use-jikan-query";
import AnimeList, { AnimeListHeader } from "./AnimeList";

export default function TopAnimeList() {
  const query = useJikanInfiniteQuery({
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
