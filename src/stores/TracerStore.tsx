import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

export enum ImageUploadType {
  FILE,
  URL,
}

interface TracerState {
  uploadType: ImageUploadType;
  imageFile?: string;
  imageUrl?: string;
}

interface Actions {
  setUploadType: (type: TracerState["uploadType"]) => void;
  setImageFile: (file: TracerState["imageFile"]) => void;
  setImageUrl: (url: TracerState["imageUrl"]) => void;
}

type TracerContext = TracerState & { actions: Actions };
type TracerContextStore = StoreApi<TracerContext>;

const TracerContext = createContext<TracerContextStore | undefined>(undefined);

const initialState: TracerState = {
  uploadType: ImageUploadType.FILE,
  imageFile: undefined,
  imageUrl: undefined,
};

export default function TracerStoreProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<TracerContext>((set) => ({
      ...initialState,
      actions: {
        setUploadType: (type) => set({ uploadType: type }),
        setImageFile: (file) => set({ imageFile: file }),
        setImageUrl: (url) => set({ imageUrl: url }),
      },
    }))
  );

  return (
    <TracerContext.Provider value={store}>{children}</TracerContext.Provider>
  );
}

function useTracerStore<U>(
  selector: (state: ReturnType<TracerContextStore["getState"]>) => U
): U {
  const store = useContext(TracerContext);
  if (!store) {
    throw new Error("useTracerContext must be use within a TracerProvider");
  }

  return useStore(store, selector);
}

export const useTracerAll = () => useTracerStore((state) => state);
export const useTracerActions = () =>
  useTracerStore(useShallow((state) => state.actions));

export const useTracerUploadType = () =>
  useTracerStore((state) => state.uploadType);
export const useTracerImageFile = () =>
  useTracerStore((state) => state.imageFile);
export const useTracerImageUrl = () =>
  useTracerStore((state) => state.imageUrl);
