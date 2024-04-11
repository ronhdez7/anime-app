import jikan from "@/lib/jikan";
import { useJikanQuery } from "@/hooks/use-jikan-query";
import AnimeList from "./AnimeList";

export default function TopAnimeList() {
  const query = useJikanQuery({
    queryKey: ["anime-list", "top"],
    queryFn: ({ signal }) => jikan.getTopAnime({ signal }),
  });

  return <AnimeList query={query}></AnimeList>;
}
