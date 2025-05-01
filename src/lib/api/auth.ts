"use client";

import { ApiClient } from "./client";

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest extends LoginRequest {
  first_name: string;
  last_name: string;
  username: string;
  type: "customer";
  brand_id: number;
  password_confirmation: string;
}

interface AuthResponse {
  data: {
    token: string;
  };
}

interface AuthenticatedUserResponse {
  data: {
    user: {
      id: number;
      brand_id: number;
      role_id: number;
      first_name: string;
      last_name: string;
      email: string;
      username: string;
      email_verified_at: string;
      ip_address: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export class AuthService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>("/auth/login", data);
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>("/auth/register", data);
  }

  async logout(): Promise<void> {
    await this.client.post("/auth/logout", {});
    this.client.clearAuthToken();
  }

  async refreshToken(): Promise<AuthResponse> {
    return this.client.post<AuthResponse>("/auth/refresh", {});
  }

  async getAuthenticatedUser(): Promise<AuthenticatedUserResponse> {
    return this.client.get<AuthenticatedUserResponse>("/auth/me");
  }
}
