import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from "axios";
import { ApiResponse, ApiErrorResponse } from "@/types/api/common";
import { ApiError } from "./error";

export const createApiClient = (baseURL: string) => {
  const client: AxiosInstance = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  const setupInterceptors = () => {
    client.interceptors.response.use(
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
  };

  setupInterceptors();

  const request = async <T>(
    method: Method,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await client.request<ApiResponse<T>>({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  };

  return {
    request,
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>("GET", url, undefined, config),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>("POST", url, data, config),
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>("PUT", url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>("DELETE", url, undefined, config),
  };
};

export type ApiClient = ReturnType<typeof createApiClient>;
