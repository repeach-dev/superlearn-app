import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PlayerParams {
  userId: string; // email
  userPk: string; // user._id
  packageProductId: string;
  courseId: string;
  contentId: string;
}

interface PlayerStoreState {
  contentHash: string | null;
  userId: string | null;
  userPk: string | null;
  packageProductId: string | null;
  courseId: string | null;
  contentId: string | null;
  setPlayerParams: (params: PlayerParams) => void;
  setContentHash: (hash: string) => void;
  clearPlayerParams: () => void;
}

export const usePlayerStore = create<PlayerStoreState>()(
  persist(
    (set) => ({
      contentHash: null,
      userId: null,
      userPk: null,
      packageProductId: null,
      courseId: null,
      contentId: null,
      setPlayerParams: ({ userId, userPk, packageProductId, courseId, contentId }) =>
        set({ userId, userPk, packageProductId, courseId, contentId }),
      setContentHash: (hash) => set({ contentHash: hash }),
      clearPlayerParams: () =>
        set({ contentHash: null, userId: null, userPk: null, packageProductId: null, courseId: null, contentId: null }),
    }),
    {
      name: "player-params",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
