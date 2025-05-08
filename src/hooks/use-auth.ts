import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, clear } = useAuthStore();
  const router = useRouter();

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
    logout,
  };
}
