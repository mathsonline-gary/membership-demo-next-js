import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/types/api/auth";
import { AuthUser } from "@/types/user";
import ApiClient from "../client";

class AuthService {
  constructor(private readonly client: ApiClient) {}

  async csrf(): Promise<void> {
    await this.client.get("/sanctum/csrf-cookie");
  }

  async register(data: RegisterRequest): Promise<void> {
    await this.client.post<void>("/auth/register", data);
  }

  async login(data: LoginRequest): Promise<void> {
    await this.client.post<void>("/auth/login", data);
  }

  async logout(): Promise<void> {
    await this.client.post<void>("/auth/logout");
  }

  async user(): Promise<AuthUser | undefined> {
    const response = await this.client.get<AuthUser>("/api/me");
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await this.client.post<void>("/auth/forgot-password", data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await this.client.post<void>("/auth/reset-password", data);
  }

  async resendEmailVerification(): Promise<void> {
    await this.client.post<void>("/auth/email/verification-notification");
  }
}

export default AuthService;
