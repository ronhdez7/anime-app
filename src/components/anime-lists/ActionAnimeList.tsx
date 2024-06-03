import useAnimeSearch from "@/queries/use-anime-search";
import AnimeListView from "./AnimeListView";

export default function ActionAnimeList() {
  const query = useAnimeSearch({ genres: ["1"] });

  return <AnimeListView title="Action" query={query} />;
}
