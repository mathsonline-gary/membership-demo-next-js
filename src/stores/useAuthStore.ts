import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "@/lib/api";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
};

type AuthActions = {
  getAuthenticatedUser: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clear: () => void;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        clear: () => {
          set(initialState);
        },

        getAuthenticatedUser: async () => {
          try {
            const userResponse = await api.auth.getAuthenticatedUser();
            set({
              user: userResponse.data.user,
              isAuthenticated: true,
            });
          } catch (error) {
            set(initialState);
            return Promise.reject(error);
          }
        },

        login: async (credentials) => {
          try {
            get().clear();

            const loginResponse = await api.auth.login(credentials);

            set({
              token: loginResponse.data.token,
              isAuthenticated: true,
            });
          } catch (error) {
            return Promise.reject(error);
          }
        },

        logout: async () => {
          try {
            await api.auth.logout();
            get().clear();
          } catch (error) {
            return Promise.reject(error);
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          token: state.token,
          user: state.user,
        }),
      }
    )
  )
);
