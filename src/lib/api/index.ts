import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiError, ApiErrorResponse } from "./error";

export type ApiResponse<T> = {
  message?: string;
  data?: T;
};

export class ApiClient {
  private client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      withXSRFToken: true,
      ...config,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (!error.response) {
          throw new ApiError(
            0,
            "Network error. Please check your connection.",
            {}
          );
        }

        if (error.code === "ECONNABORTED") {
          throw new ApiError(0, "Request timeout. Please try again.", {});
        }

        // Handle server errors
        if (error.response.status >= 500) {
          throw new ApiError(
            error.response.status,
            "Server error. Please try again later.",
            error.response.data?.errors || {}
          );
        }

        // Handle client errors
        throw new ApiError(
          error.response.status,
          error.response.data?.message || error.message,
          error.response.data?.errors || {}
        );
      }
    );
  }

  async csrf(): Promise<void> {
    await this.client.get("/sanctum/csrf-cookie");
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const api = new ApiClient();
