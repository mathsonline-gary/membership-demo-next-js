import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from "axios";
import { ApiResponse, ApiErrorResponse } from "@/types/api/common";
import { ApiError } from "./error";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      withXSRFToken: true,
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
            {},
            error
          );
        }

        if (error.code === "ECONNABORTED") {
          throw new ApiError(
            0,
            "Request timeout. Please try again.",
            {},
            error
          );
        }

        // Handle server errors
        if (error.response.status >= 500) {
          throw new ApiError(
            error.response.status,
            "Server error. Please try again later.",
            error.response.data?.errors || {},
            error
          );
        }

        // Handle client errors
        throw new ApiError(
          error.response.status,
          error.response.data?.message || error.message,
          error.response.data?.errors || {},
          error
        );
      }
    );
  }

  async request<T>(
    method: Method,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.request<ApiResponse<T>>({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, config);
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, undefined, config);
  }
}

export default ApiClient;
