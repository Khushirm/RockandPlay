import { create } from "zustand";

interface PlayerStore {
  activeId?: string;
  setId: (id: string) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  activeId: undefined,
  setId: (id) => set({ activeId: id }),
  reset: () => set({ activeId: undefined }),
}));

export default usePlayer;
