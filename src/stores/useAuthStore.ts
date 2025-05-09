import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  id: number;
  brand_id: number;
  role_id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  email_verified_at: string | null;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,

        setUser: (user) => set({ user }),
        setAccessToken: (token) => set({ accessToken: token }),
        clear: () => set({ user: null, accessToken: null }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
        }),
      }
    )
  )
);