import useAnimeSearch from "@/queries/use-anime-search";
import { useSearchAll } from "@/stores/SearchStore";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { AnimeGridView } from "../anime-lists/AnimeGrid";
import { useDebounce } from "use-debounce";
import { apiKeys } from "@/queries/keys";

export default function SearchResults() {
  const queryClient = useQueryClient();

  const params = useSearchAll();
  const [debouncedParams] = useDebounce(params, 400);
  const query = useAnimeSearch(debouncedParams);

  function refresh() {
    queryClient.setQueryData<InfiniteData<any>>(
      apiKeys.search(debouncedParams),
      (data) => ({
        pages: data?.pages.slice(0, 1) ?? [],
        pageParams: data?.pageParams.slice(0, 1) ?? [],
      })
    );
    query.refetch();
  }

  return <AnimeGridView query={query} onRefresh={refresh} />;
}
