import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/types/api/auth";
import { AuthUser } from "@/types/user";
import { ApiClient } from "../client";

export const createAuthService = (client: ApiClient) => ({
  csrf: async (): Promise<void> => {
    await client.get("/sanctum/csrf-cookie");
  },

  register: async (data: RegisterRequest): Promise<void> => {
    await client.post<void>("/auth/register", {
      ...data,
      role: "teacher",
    });
  },

  login: async (data: LoginRequest): Promise<void> => {
    await client.post<void>("/auth/login", { ...data, role: "teacher" });
  },

  logout: async (): Promise<void> => {
    await client.post<void>("/auth/logout");
  },

  user: async (): Promise<AuthUser | undefined> => {
    const response = await client.get<AuthUser>("/api/me");
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await client.post<void>("/auth/forgot-password", data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await client.post<void>("/auth/reset-password", data);
  },

  resendEmailVerification: async (): Promise<void> => {
    await client.post<void>("/auth/email/verification-notification");
  },
});

export type AuthService = ReturnType<typeof createAuthService>;
