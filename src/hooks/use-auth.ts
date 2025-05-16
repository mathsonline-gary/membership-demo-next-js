import useSWR from "swr";
import * as React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/error";
import {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
} from "@/types/api/auth";

type AuthConfig = {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
};

type ErrorSetter = {
  setError: (message: string | null, errors: Record<string, string[]>) => void;
};

type RegisterProps = ErrorSetter & RegisterRequest;

type LoginProps = ErrorSetter & LoginRequest;

type ForgotPasswordProps = ErrorSetter & ForgotPasswordRequest;

type ResetPasswordProps = ErrorSetter & {
  password: string;
  password_confirmation: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthConfig = {}) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/user",
    async () => {
      try {
        return await api.auth.user();
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
      await api.auth.csrf();
      setError(null, {});
      await api.auth.register(props);
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
      await api.auth.csrf();
      setError(null, {});
      await api.auth.login({ ...props, role: "teacher" });
      await mutate();
    } catch (error) {
      if (error instanceof ApiError && error.isUnprocessableEntity()) {
        setError(null, error.getErrors());
      } else {
        setError("Failed to login, please try again.", {});
      }
      throw error;
    }
  };

  const forgotPassword = async ({ setError, email }: ForgotPasswordProps) => {
    try {
      await api.auth.csrf();
      setError(null, {});
      await api.auth.forgotPassword({ email });
    } catch (error) {
      if (error instanceof ApiError && error.isUnprocessableEntity()) {
        setError(null, error.getErrors());
      } else {
        setError("Failed to send reset link, please try again.", {});
      }
      throw error;
    }
  };

  const resetPassword = async ({ setError, ...props }: ResetPasswordProps) => {
    const token = params.token as string;
    const email = searchParams.get("email");

    if (!token || !email) {
      setError("The password reset link is invalid.", {});
      return;
    }

    try {
      await api.auth.csrf();
      setError(null, {});
      await api.auth.resetPassword({
        token,
        email,
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
      await api.auth.resendEmailVerification();
    } catch (error) {
      setError("Failed to resend verification email, please try again.", {});
      throw error;
    }
  };

  const logout = React.useCallback(async () => {
    if (!error) {
      try {
        await api.auth.logout();
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
