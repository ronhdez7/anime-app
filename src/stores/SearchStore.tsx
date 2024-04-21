import { AnimeSearchOptions } from "@/lib/jikan";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";

interface Actions {
  setQuery: (query: string) => void;
  addGenre: (genre: number) => void;
  removeGenre: (genre: number) => void;
  selectType: (type?: AnimeSearchOptions["type"]) => void;
  selectStatus: (status?: AnimeSearchOptions["status"]) => void;
  selectOrder: (order?: AnimeSearchOptions["order_by"]) => void;
  selectSort: (sort?: AnimeSearchOptions["sort"]) => void;
}
type SearchContext = AnimeSearchOptions & {
  actions: Actions;
  genres: number[];
};
type SearchContextStore = StoreApi<SearchContext>;

const SearchContext = createContext<SearchContextStore | undefined>(undefined);

export default function SearchStoreProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<SearchContext>((set) => ({
      genres: [],
      actions: {
        setQuery: (query) => set(() => ({ q: query })),
        addGenre: (genre) =>
          set((state) => ({ genres: [...state.genres, genre] })),
        removeGenre: (genre) =>
          set((state) => ({ genres: state.genres.filter((e) => e !== genre) })),
        selectType: (type) => set(() => ({ type })),
        selectStatus: (status) => set(() => ({ status })),
        selectOrder: (order) => set(() => ({ order_by: order })),
        selectSort: (sort) => set(() => ({ sort })),
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
export const useSearchGenres = () => useSearchStore((state) => state.genres);
export const useSearchSFW = () => useSearchStore((state) => state.sfw);
export const useSearchType = () => useSearchStore((state) => state.type);
export const useSearchStatus = () => useSearchStore((state) => state.status);
export const useSearchSort = () => useSearchStore((state) => state.sort);
export const useSearchOrder = () => useSearchStore((state) => state.order_by);

export const useSearchActions = () => useSearchStore((state) => state.actions);
