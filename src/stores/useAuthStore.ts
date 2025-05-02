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
  logout: () => void;
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
      const clearAuthentication = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      };
      const setLoginError = (loginError: string | null) => set({ loginError });
      const setIsLoggingIn = (isLoggingIn: boolean) => set({ isLoggingIn });
      const setIsLoggingOut = (isLoggingOut: boolean) => set({ isLoggingOut });
      const setLogoutError = (logoutError: string | null) =>
        set({ logoutError });

      return {
        ...initialState,

        getAuthenticatedUser: async () => {
          try {
            const userResponse = await api.auth.getAuthenticatedUser();
            setUser(userResponse.data.user);
            setIsAuthenticated(true);
          } catch (error) {
            clearAuthentication();
            return Promise.reject(error);
          }
        },

        login: async (credentials) => {
          try {
            clearAuthentication();
            setIsLoggingIn(true);
            setLoginError(null);

            // Login request
            const loginResponse = await api.auth.login(credentials);
            const token = loginResponse.data.token;
            api.setAuthToken(token);
            setToken(token);
            setIsAuthenticated(true);
          } catch (error) {
            let errorMessage = "An unexpected error occurred";

            if (error instanceof ApiError) {
              if (error.data && Array.isArray(error.data)) {
                // Handle validation errors
                const firstError = error.data[0];
                errorMessage = firstError.message || errorMessage;
              } else if (error.message) {
                errorMessage = error.message;
              }
            }

            setLoginError(errorMessage);
            setIsLoggingIn(false);
            clearAuthentication();
            return Promise.reject(error);
          } finally {
            setIsLoggingIn(false);
          }
        },

        clearLoginError: () => {
          setLoginError(null);
        },

        logout: () => {
          try {
            setIsLoggingOut(true);
            setLogoutError(null);

            api.clearAuthToken();
            clearAuthentication();
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
