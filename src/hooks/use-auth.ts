import { api } from "@/lib/api";
import { LoginRequest, RegisterRequest } from "@/lib/api/services/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, setUser, clear, setAccessToken } = useAuthStore();
  const router = useRouter();

  const getAuthenticatedUser = async () => {
    if (!user) {
      const response = await api.auth.getAuthenticatedUser();
      setUser(response.data.user);
    }

    return user;
  };

  const register = async (data: RegisterRequest) => {
    const response = await api.auth.register(data);
    setAccessToken(response.data.token);
  };

  const login = async (data: LoginRequest) => {
    const response = await api.auth.login(data);
    setAccessToken(response.data.token);
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

  return {
    user,
    getAuthenticatedUser,
    login,
    logout,
    register,
  };
}
