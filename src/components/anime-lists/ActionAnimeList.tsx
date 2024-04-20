import { AnimeListView } from "./AnimeList";
import useAnimeSearch from "@/queries/jikan/use-anime-search";

export default function ActionAnimeList() {
  // const query = useJikanInfiniteQuery({
  //   queryKey: ["anime-list", "action"],
  //   queryFn: ({ pageParam, signal }) =>
  //     jikan.getAnimeSearch({ genres: [1], page: pageParam }, { signal }),
  // });

  const query = useAnimeSearch({ genres: [1] });

  return <AnimeListView title="Action" query={query} />;
}
