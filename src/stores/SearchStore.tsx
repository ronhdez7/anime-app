import { AnimeSearchParams } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type SearchState = AnimeSearchParams & {
  genres: string[];
};

interface Actions {
  setQuery: (query: SearchState["query"]) => void;
  addGenre: (genre: SearchState["genres"][0]) => void;
  removeGenre: (genre: SearchState["genres"][0]) => void;
  selectType: (type?: SearchState["type"]) => void;
  selectStatus: (status?: SearchState["status"]) => void;
  selectOrder: (orderBy?: SearchState["orderBy"]) => void;
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
        setQuery: (query) => set(() => ({ query })),
        addGenre: (genre) =>
          set((state) => ({ genres: [...state.genres, genre] })),
        removeGenre: (genre) =>
          set((state) => ({ genres: state.genres.filter((e) => e !== genre) })),
        selectType: (type) => set(() => ({ type })),
        selectStatus: (status) => set(() => ({ status })),
        selectOrder: (orderBy) => set(() => ({ orderBy })),
        selectSort: (sort) => set(() => ({ sort })),
        resetFilters: () =>
          set(
            (state) => ({
              ...initialState,
              query: state.query,
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

export const useSearchQuery = () => useSearchStore((state) => state.query);
export const useSearchType = () => useSearchStore((state) => state.type);
export const useSearchScore = () => useSearchStore((state) => state.score);
export const useSearchMinScore = () =>
  useSearchStore((state) => state.minScore);
export const useSearchMaxScore = () =>
  useSearchStore((state) => state.maxScore);
export const useSearchStatus = () => useSearchStore((state) => state.status);
export const useSearchRating = () => useSearchStore((state) => undefined);
export const useSearchAdult = () => useSearchStore((state) => state.adult);
export const useSearchGenres = () => useSearchStore((state) => state.genres);
export const useSearchGenresExclude = () =>
  useSearchStore((state) => state.genresExclude);
export const useSearchOrderBy = () => useSearchStore((state) => state.orderBy);
export const useSearchSort = () => useSearchStore((state) => state.sort);
export const useSearchStartDate = () =>
  useSearchStore((state) => state.startDate);
export const useSearchEndDate = () => useSearchStore((state) => state.endDate);

export const useSearchActions = () =>
  useSearchStore(useShallow((state) => state.actions));
