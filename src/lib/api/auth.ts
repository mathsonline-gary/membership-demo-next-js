import { ApiClient } from "./client";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest extends LoginRequest {
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
      avatar: string | null;
    };
  };
}

interface GoogleAuthResponse {
  data: {
    url: string;
  };
}

export class AuthService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>("/auth/login", data);
    this.client.setAuthToken(response.data.token);
    return response;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      "/auth/register",
      data
    );
    this.client.setAuthToken(response.data.token);
    return response;
  }

  async logout(): Promise<void> {
    await this.client.post("/auth/logout", {});
    this.client.clearAuthToken();
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>("/auth/refresh", {});
    this.client.setAuthToken(response.data.token);
    return response;
  }

  async getAuthenticatedUser(): Promise<AuthenticatedUserResponse> {
    return this.client.get<AuthenticatedUserResponse>("/auth/me");
  }

  async getGoogleRedirectUrl({
    mode,
  }: {
    mode: "login" | "register";
  }): Promise<GoogleAuthResponse> {
    return this.client.get<GoogleAuthResponse>("/oauth/google", {
      params: {
        mode,
        brand_id: process.env.NEXT_PUBLIC_APP_BRAND_ID,
      },
    });
  }

  async googleLogin(code: string): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      "/oauth/google/login",
      {
        code,
        brand_id: process.env.NEXT_PUBLIC_APP_BRAND_ID,
      }
    );
    this.client.setAuthToken(response.data.token);
    return response;
  }

  async googleRegister(code: string): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      "/oauth/google/register",
      {
        code,
        brand_id: process.env.NEXT_PUBLIC_APP_BRAND_ID,
      }
    );
    this.client.setAuthToken(response.data.token);
    return response;
  }
}
