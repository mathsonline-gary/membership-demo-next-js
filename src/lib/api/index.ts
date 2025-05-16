import UserService from "./services/user";
import AuthService from "./services/auth";
import ApiClient from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

class ApiService {
  private static instance: ApiService;
  private readonly client: ApiClient;

  readonly users: UserService;
  readonly auth: AuthService;

  constructor() {
    this.client = new ApiClient(BASE_URL);
    this.users = new UserService(this.client);
    this.auth = new AuthService(this.client);
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
}

export const api = ApiService.getInstance();
