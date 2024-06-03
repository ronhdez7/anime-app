import useTopAnime from "@/queries/use-top-anime";
import AnimeListView from "./AnimeListView";

export default function TopAnimeList() {
  const query = useTopAnime();

  return <AnimeListView title="Top" query={query} />;
}
