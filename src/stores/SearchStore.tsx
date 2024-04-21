import { AnimeSearchOptions } from "@/lib/jikan";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";

interface Actions {
  setQuery: (query: string) => void;
}
type SearchContext = AnimeSearchOptions & { actions: Actions };
type SearchContextStore = StoreApi<SearchContext>;

const SearchContext = createContext<SearchContextStore | undefined>(undefined);

export default function SearchStoreProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<SearchContext>((set) => ({
      actions: {
        setQuery: (query) => set(() => ({ q: query })),
      },
    }))
  );

  return (
    <SearchContext.Provider value={store}>{children}</SearchContext.Provider>
  );
}

function useSearchStore<U>(
  selector: (state: ReturnType<SearchContextStore["getState"]>) => U
): U {
  const store = useContext(SearchContext);
  if (!store) {
    throw new Error("useSearchContext must be use within a SearchProvider");
  }

  return useStore(store, selector);
}

export const useSearchAll = () => useSearchStore((state) => state);

export const useSearchQuery = () => useSearchStore((state) => state.q);
export const useSearchActions = () => useSearchStore((state) => state.actions);
