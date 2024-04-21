import { queryClient } from "@/lib/query-client";
import useAnimeSearch from "@/queries/jikan/use-anime-search";
import { jikanKeys } from "@/queries/jikan/use-jikan-query";
import { useSearchAll } from "@/stores/SearchStore";
import { InfiniteData } from "@tanstack/react-query";
import AnimeGrid from "../anime-lists/AnimeGrid";

export default function SearchResults() {
  const params = useSearchAll();

  const query = useAnimeSearch(params);

  function refresh() {
    queryClient.setQueryData<InfiniteData<any>>(
      jikanKeys.search(params),
      (data) => ({
        pages: data?.pages.slice(0, 1) ?? [],
        pageParams: data?.pageParams.slice(0, 1) ?? [],
      })
    );
    query.refetch();
  }

  return <AnimeGrid query={query} onRefresh={refresh} />;
}
