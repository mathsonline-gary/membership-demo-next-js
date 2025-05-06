import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/client";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  // add other user fields as needed
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  // Authentication state
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;

  // Login state
  isLoggingIn: boolean;
  loginError: string | null;

  // Logout state
  isLoggingOut: boolean;
  logoutError: string | null;
};

type AuthActions = {
  getAuthenticatedUser: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  clearLoginError: () => void;
  logout: () => Promise<void>;
  clear: () => void;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoggingIn: false,
  loginError: null,
  isLoggingOut: false,
  logoutError: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        clear: () => {
          set((state) => ({
            ...initialState,
            isLoggingIn: state.isLoggingIn,
            isLoggingOut: state.isLoggingOut,
          }));
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
            set({
              ...initialState,
              isLoggingIn: true,
            });

            const loginResponse = await api.auth.login(credentials);
            set({
              token: loginResponse.data.token,
              isAuthenticated: true,
              isLoggingIn: false,
            });
          } catch (error) {
            let errorMessage = "An unexpected error occurred";

            if (error instanceof ApiError) {
              if (error.data && Array.isArray(error.data)) {
                const firstError = error.data[0];
                errorMessage = firstError.message || errorMessage;
              } else if (error.message) {
                errorMessage = error.message;
              }
            }

            set({
              ...initialState,
              loginError: errorMessage,
            });
            return Promise.reject(error);
          }
        },

        clearLoginError: () => set({ loginError: null }),

        logout: async () => {
          try {
            set({ isLoggingOut: true });
            await api.auth.logout();
            set(initialState);
          } catch (error) {
            console.error(error);
          } finally {
            set({ isLoggingOut: false });
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
