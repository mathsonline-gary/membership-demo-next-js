import { ApiClient } from "./client";
import { AuthService } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

class ApiService {
  private static instance: ApiService;
  private client: ApiClient;
  public auth: AuthService;

  private constructor() {
    this.client = new ApiClient(API_BASE_URL);
    this.auth = new AuthService(this.client);
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public setAuthToken(token: string) {
    this.client.setAuthToken(token);
  }

  public clearAuthToken() {
    this.client.clearAuthToken();
  }
}

export const api = ApiService.getInstance();
