import useSWR from "swr";
import { useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { api, ApiResponse } from "@/lib/api";
import { ApiError } from "@/lib/api/error";

type AuthenticatedUser = {
  email_verified_at: string | null;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
};

type AuthConfig = {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
};

type ErrorSetter = {
  setError: (message: string | null, errors: Record<string, string[]>) => void;
};

type RegisterProps = ErrorSetter & {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  role: string;
};

type LoginProps = ErrorSetter & {
  email: string;
  password: string;
  remember?: boolean;
};

type ForgotPasswordProps = ErrorSetter & {
  email: string;
};

type ResetPasswordProps = ErrorSetter & {
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthConfig = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", async () => {
    try {
      const response: ApiResponse<AuthenticatedUser> = await api.get(
        "/api/user"
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.isConflict()) {
        router.push("/verify-email");
        return null;
      }
      return null;
    }
  });

  const register = useCallback(
    async ({ setError, ...props }: RegisterProps) => {
      await api.csrf();
      setError(null, {});

      try {
        await api.post("/register", props);
        await mutate();
      } catch (error) {
        if (error instanceof ApiError && error.isUnprocessableEntity()) {
          setError(error.message, error.getErrors());
        } else {
          setError("Failed to register, please try again.", {});
        }
      }
    },
    [mutate]
  );

  const login = useCallback(
    async ({ setError, ...props }: LoginProps) => {
      try {
        await api.csrf();
        setError(null, {});
        await api.post("/login", props);
        await mutate();
      } catch (error) {
        if (error instanceof ApiError) {
          setError(error.message, error.getErrors());
        }

        throw error;
      }
    },
    [mutate]
  );

  const forgotPassword = useCallback(
    async ({ setError, email }: ForgotPasswordProps) => {
      await api.csrf();
      setError(null, {});

      try {
        await api.post("/forgot-password", { email });
      } catch (error) {
        if (error instanceof ApiError && error.isUnprocessableEntity()) {
          setError(error.message, error.getErrors());
        } else {
          setError("Failed to send reset link, please try again.", {});
        }
      }
    },
    []
  );

  const resetPassword = useCallback(
    async ({ setError, ...props }: ResetPasswordProps) => {
      await api.csrf();
      setError(null, {});

      try {
        await api.post("/reset-password", { token: params.token, ...props });
      } catch (error) {
        if (error instanceof ApiError && error.isUnprocessableEntity()) {
          setError(error.message, error.getErrors());
        } else {
          setError("Failed to reset password, please try again.", {});
        }
      }
    },
    [params.token]
  );

  const resendEmailVerification = useCallback(async () => {
    try {
      await api.post("/email/verification-notification");
    } catch (error) {
      console.error("Failed to resend verification email:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    if (!error) {
      await api.post("/logout");
      await mutate();
    }

    window.location.pathname = "/login";
  }, [error, mutate]);

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && user && !user.email_verified_at)
      router.push("/verify-email");

    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated || "/");
    if (middleware === "auth" && error) logout();
  }, [user, error, router, redirectIfAuthenticated, middleware, logout]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
