import useAnimeSearch from "@/queries/jikan/use-anime-search";
import { jikanKeys } from "@/queries/jikan/use-jikan-query";
import { useSearchAll } from "@/stores/SearchStore";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { AnimeGridView } from "../anime-lists/AnimeGrid";
import { useDebounce } from "use-debounce";

export default function SearchResults() {
  const queryClient = useQueryClient();

  const params = useSearchAll();
  const [debouncedParams] = useDebounce(params, 400);
  const query = useAnimeSearch(debouncedParams);

  function refresh() {
    queryClient.setQueryData<InfiniteData<any>>(
      jikanKeys.search(debouncedParams),
      (data) => ({
        pages: data?.pages.slice(0, 1) ?? [],
        pageParams: data?.pageParams.slice(0, 1) ?? [],
      })
    );
    query.refetch();
  }

  return <AnimeGridView query={query} onRefresh={refresh} />;
}
