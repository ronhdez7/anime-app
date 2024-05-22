import { AnimeSearchParams } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

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
export const useSearchType = () => useSearchStore((state) => state.type);
export const useSearchScore = () => useSearchStore((state) => state.score);
export const useSearchMinScore = () =>
  useSearchStore((state) => state.min_score);
export const useSearchMaxScore = () =>
  useSearchStore((state) => state.max_score);
export const useSearchStatus = () => useSearchStore((state) => state.status);
export const useSearchRating = () => useSearchStore((state) => state.rating);
export const useSearchSFW = () => useSearchStore((state) => state.sfw);
export const useSearchGenres = () => useSearchStore((state) => state.genres);
export const useSearchGenresExclude = () =>
  useSearchStore((state) => state.genres_exclude);
export const useSearchOrderBy = () => useSearchStore((state) => state.order_by);
export const useSearchSort = () => useSearchStore((state) => state.sort);
export const useSearchStartDate = () =>
  useSearchStore((state) => state.start_date);
export const useSearchEndDate = () => useSearchStore((state) => state.end_date);

export const useSearchActions = () =>
  useSearchStore(useShallow((state) => state.actions));
