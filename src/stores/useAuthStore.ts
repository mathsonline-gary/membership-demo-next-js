import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/client";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
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
  reset: () => void;
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
  persist(
    (set) => {
      // Private actions
      const setIsAuthenticated = (isAuthenticated: boolean) =>
        set({ isAuthenticated });
      const setUser = (user: User | null) => set({ user });
      const setToken = (token: string | null) => set({ token });
      const setLoginError = (loginError: string | null) => set({ loginError });
      const setIsLoggingIn = (isLoggingIn: boolean) => set({ isLoggingIn });
      const setIsLoggingOut = (isLoggingOut: boolean) => set({ isLoggingOut });

      const reset = () => {
        set((state) => ({
          ...initialState,
          isLoggingIn: state.isLoggingIn,
          isLoggingOut: state.isLoggingOut,
        }));
      };

      return {
        ...initialState,
        reset,

        getAuthenticatedUser: async () => {
          try {
            const userResponse = await api.auth.getAuthenticatedUser();
            setUser(userResponse.data.user);
            setIsAuthenticated(true);
          } catch (error) {
            reset();
            return Promise.reject(error);
          }
        },

        login: async (credentials) => {
          try {
            reset();
            setIsLoggingIn(true);
            setLoginError(null);

            const loginResponse = await api.auth.login(credentials);
            const token = loginResponse.data.token;
            setToken(token);
            setIsAuthenticated(true);
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

            setLoginError(errorMessage);
            reset();
            return Promise.reject(error);
          } finally {
            setIsLoggingIn(false);
          }
        },

        clearLoginError: () => {
          set({ loginError: null });
        },

        logout: async () => {
          try {
            setIsLoggingOut(true);
            await api.auth.logout(); // This will clear the token
            reset();
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoggingOut(false);
          }
        },
      };
    },
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
    }
  )
);
