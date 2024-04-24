import { AnimeSearchParams } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";

type SearchState = AnimeSearchParams & {
  genres: number[];
};

interface Actions {
  setQuery: (query: string) => void;
  addGenre: (genre: number) => void;
  removeGenre: (genre: number) => void;
  selectType: (type?: SearchState["type"]) => void;
  selectStatus: (status?: SearchState["status"]) => void;
  selectOrder: (order?: SearchState["order_by"]) => void;
  selectSort: (sort?: SearchState["sort"]) => void;
  resetFilters: () => void;
}

type SearchContext = SearchState & { actions: Actions };
type SearchContextStore = StoreApi<SearchContext>;

const SearchContext = createContext<SearchContextStore | undefined>(undefined);

const initialState: SearchState = { genres: [] };

export default function SearchStoreProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<SearchContext>((set) => ({
      ...initialState,
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
        resetFilters: () =>
          set(
            (state) => ({
              ...initialState,
              q: state.q,
              actions: state.actions,
            }),
            true
          ),
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
