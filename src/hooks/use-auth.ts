import useSWR from "swr";
import * as React from "react";
import { useRouter } from "next/navigation";
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
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthConfig = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/user",
    async () => {
      try {
        const response: ApiResponse<AuthenticatedUser> = await api.get(
          "/api/user"
        );
        return response.data;
      } catch (error) {
        if (error instanceof ApiError && error.isConflict()) {
          router.push("/verify-email");
        }
        throw error;
      }
    },
    {
      shouldRetryOnError: (error) => {
        return !(error instanceof ApiError && error.isUnauthorized());
      },
    }
  );

  const register = async ({ setError, ...props }: RegisterProps) => {
    try {
      await api.csrf();
      setError(null, {});
      await api.post("/auth/register", { ...props, role: "teacher" });
      await mutate();
    } catch (error) {
      if (error instanceof ApiError && error.isUnprocessableEntity()) {
        setError(error.message, error.getErrors());
      } else {
        setError("Failed to register, please try again.", {});
      }
    }
  };

  const login = async ({ setError, ...props }: LoginProps) => {
    try {
      await api.csrf();
      setError(null, {});
      await api.post("/auth/login", { ...props, role: "teacher" });
      await mutate();
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message, error.getErrors());
      }
      throw error;
    }
  };

  const forgotPassword = async ({ setError, email }: ForgotPasswordProps) => {
    try {
      await api.csrf();
      setError(null, {});
      await api.post("/auth/forgot-password", { email });
    } catch (error) {
      if (error instanceof ApiError && error.isUnprocessableEntity()) {
        setError(error.message, error.getErrors());
      } else {
        setError("Failed to send reset link, please try again.", {});
      }
      throw error;
    }
  };

  const resetPassword = async ({
    token,
    setError,
    ...props
  }: ResetPasswordProps) => {
    try {
      await api.csrf();
      setError(null, {});
      await api.post("/auth/reset-password", {
        token,
        ...props,
      });
    } catch (error) {
      if (error instanceof ApiError && error.isUnprocessableEntity()) {
        setError(error.message, error.getErrors());
      } else {
        setError("Failed to reset password, please try again.", {});
      }
      throw error;
    }
  };

  const resendEmailVerification = async ({ setError }: ErrorSetter) => {
    try {
      await api.post("/auth/email/verification-notification");
    } catch (error) {
      if (error instanceof ApiError && error.isUnprocessableEntity()) {
        setError(error.message, error.getErrors());
      } else {
        setError("Failed to resend verification email, please try again.", {});
      }
      throw error;
    }
  };

  const logout = React.useCallback(async () => {
    if (!error) {
      try {
        await api.post("/auth/logout");
        await mutate();
      } catch (error) {
        if (!(error instanceof ApiError && error.isUnauthorized())) {
          throw error;
        }
      }
    }
    window.location.href = "/login";
  }, [error, mutate]);

  React.useEffect(() => {
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
