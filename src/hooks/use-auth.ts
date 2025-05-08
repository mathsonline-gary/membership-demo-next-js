import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";

type LoginCredentials = {
  email: string;
  password: string;
  remember: boolean;
};

export function useAuth() {
  const { user, setUser, setAccessToken, clear } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.auth.login(credentials);
      setAccessToken(response.data.token);

      const userResponse = await api.auth.getAuthenticatedUser();
      setUser(userResponse.data.user);

      router.push(searchParams.get("redirect") ?? "/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
      clear();
      router.push("/login");
    } catch (error) {
      throw error;
    }
  };

  const getAuthenticatedUser = async () => {
    try {
      const response = await api.auth.getAuthenticatedUser();
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    login,
    logout,
    getAuthenticatedUser,
  };
}
