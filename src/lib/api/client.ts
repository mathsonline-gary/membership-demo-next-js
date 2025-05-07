import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Handle 401 Unauthorized
          if (error.response.status === 401) {
            useAuthStore.getState().clear();
          }

          if (error.response.status >= 500) {
            throw new ApiError("An unexpected error occurred", 0);
          }

          const message =
            (error.response.data as { message?: string })?.message ||
            "An error occurred";
          throw new ApiError(
            message,
            error.response.status,
            error.response.data
          );
        }

        if (error.request) {
          throw new ApiError("Network error occurred", 0);
        }

        throw new ApiError("An unexpected error occurred", 0);
      }
    );
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, config);
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }

  setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
  }
}
