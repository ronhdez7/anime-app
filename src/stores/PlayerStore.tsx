import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

export enum VideoState {
  LOADING,
  BUFFERING,
  PLAYING,
  ENDED,
}

type PlayerState = {
  play: boolean;
  speed: number;
  progress: number;
  duration: number;
  status: VideoState;
  seeking: boolean;
  fullscreen: boolean;
  showControls: boolean;
};

const initialState: PlayerState = {
  play: false,
  speed: 1,
  progress: 0,
  duration: 0,
  status: VideoState.LOADING,
  seeking: false,
  fullscreen: false,
  showControls: true,
};

interface Actions {
  reset: () => void;
  setPlay: (play: PlayerState["play"]) => void;
  setSpeed: (speed: PlayerState["speed"]) => void;
  setProgress: (progress: PlayerState["progress"]) => void;
  incrementProgress: () => void;
  setDuration: (duration: PlayerState["duration"]) => void;
  setStatus: (status: PlayerState["status"]) => void;
  setSeeking: (seeking: PlayerState["seeking"]) => void;
  setFullscreen: (fullscreen: PlayerState["fullscreen"]) => void;
  setShowControls: (showControls: PlayerState["showControls"]) => void;
}

type PlayerContext = PlayerState & { actions: Actions };
type PlayerContextStore = StoreApi<PlayerContext>;
const PlayerContext = createContext<PlayerContextStore | undefined>(undefined);

export interface PlayerStoreProviderProps extends PropsWithChildren {}
export default function PlayerStoreProvider({
  children,
}: PlayerStoreProviderProps) {
  const [store] = useState(() =>
    createStore<PlayerContext>((set) => ({
      ...initialState,
      actions: {
        reset: () => set(() => initialState, true),
        setPlay: (play) => set(() => ({ play })),
        setSpeed: (speed) => set(() => ({ speed })),
        setProgress: (progress) => set(() => ({ progress })),
        incrementProgress: () =>
          set((state) => ({ progress: state.progress + 1000 })),
        setDuration: (duration) => set(() => ({ duration })),
        setStatus: (status) => set(() => ({ status })),
        setSeeking: (seeking) => set(() => ({ seeking })),
        setFullscreen: (fullscreen) => set(() => ({ fullscreen })),
        setShowControls: (showControls) => set(() => ({ showControls })),
      },
    }))
  );

  return (
    <PlayerContext.Provider value={store}>{children}</PlayerContext.Provider>
  );
}

function usePlayerStore<U>(
  selector: (state: ReturnType<PlayerContextStore["getState"]>) => U
): U {
  const store = useContext(PlayerContext);
  if (!store) {
    throw new Error("usePlayerContext must be use within a PlayerProvider");
  }

  return useStore(store, selector);
}

export const usePlayerAll = () => usePlayerStore((state) => state);
export const usePlayerActions = () =>
  usePlayerStore(useShallow((state) => state.actions));

export const usePlayerPlay = () => usePlayerStore((state) => state.play);
export const usePlayerSpeed = () => usePlayerStore((state) => state.speed);
export const usePlayerStatus = () => usePlayerStore((state) => state.status);
export const usePlayerSeeking = () => usePlayerStore((state) => state.seeking);
export const usePlayerFullscreen = () =>
  usePlayerStore((state) => state.fullscreen);
export const usePlayerShowControls = () =>
  usePlayerStore((state) => state.showControls);

// progress
export const usePlayerProgress = () =>
  usePlayerStore((state) => state.progress);
export const usePlayerProgressInSecs = () =>
  Math.round(usePlayerProgress() / 1000);
export const usePlayerDuration = () =>
  usePlayerStore((state) => state.duration);
export const usePlayerDurationInSecs = () =>
  Math.round(usePlayerDuration() / 1000);
