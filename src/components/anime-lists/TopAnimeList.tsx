import { AnimeListView } from "./AnimeList";
import useTopAnime from "@/queries/jikan/use-top-anime";

export default function TopAnimeList() {
  const query = useTopAnime();

  return <AnimeListView title="Top" query={query} />;
}
