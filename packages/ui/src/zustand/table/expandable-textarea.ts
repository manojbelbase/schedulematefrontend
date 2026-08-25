import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isFullScreen: boolean;
  textWrapped: boolean;
};

type Actions = {
  setIsFullScreen: (isFullScreen: boolean) => void;
  setTextWrapped: (textWrapped: boolean) => void;
};

export const useTableUiConfigStore = create<State & Actions>()(
  persist(
    (set) => ({
      isFullScreen: false,
      textWrapped: true,
      setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
      setTextWrapped: (textWrapped) => set({ textWrapped }),
    }),
    {
      name: "text-wrapped-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
