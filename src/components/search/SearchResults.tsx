import { queryClient } from "@/lib/query-client";
import useAnimeSearch from "@/queries/jikan/use-anime-search";
import { jikanKeys } from "@/queries/jikan/use-jikan-query";
import { useSearchAll } from "@/stores/SearchStore";
import { InfiniteData } from "@tanstack/react-query";
import { AnimeGridView } from "../anime-lists/AnimeGrid";
import { useDebounce } from "use-debounce";

export default function SearchResults() {
  const params = useSearchAll();
  const [debouncedParams] = useDebounce(params, 400);
  const query = useAnimeSearch(debouncedParams);

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

  return <AnimeGridView query={query} onRefresh={refresh} />;
}
