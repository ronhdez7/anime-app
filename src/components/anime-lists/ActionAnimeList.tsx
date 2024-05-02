import { AnimeListView } from "./AnimeList";
import useAnimeSearch from "@/queries/use-anime-search";

export default function ActionAnimeList() {
  const query = useAnimeSearch({ genres: [1] });

  return <AnimeListView title="Action" query={query} />;
}
