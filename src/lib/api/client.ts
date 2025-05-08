import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { ApiError, ApiErrorResponse } from "./error";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason: unknown) => void;
  }> = [];

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiErrorResponse>) => {
        const originalRequest = error.config as RetryableRequestConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest) {
                  originalRequest.headers["Authorization"] = `Bearer ${token}`;
                  return this.axiosInstance(originalRequest);
                }
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.axiosInstance.post("/auth/refresh");
            const newToken = response.data.data.token;

            useAuthStore.getState().setAccessToken(newToken);

            this.failedQueue.forEach((prom) => {
              prom.resolve(newToken);
            });

            if (originalRequest) {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.failedQueue.forEach((prom) => {
              prom.reject(refreshError);
            });

            useAuthStore.getState().clear();
            window.location.href = "/login";
            return Promise.reject(
              ApiError.fromAxiosError(
                refreshError as AxiosError<ApiErrorResponse>
              )
            );
          } finally {
            this.isRefreshing = false;
            this.failedQueue = [];
          }
        }

        return Promise.reject(
          ApiError.fromAxiosError(error as AxiosError<ApiErrorResponse>)
        );
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error as AxiosError<ApiErrorResponse>);
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error as AxiosError<ApiErrorResponse>);
    }
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error as AxiosError<ApiErrorResponse>);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error as AxiosError<ApiErrorResponse>);
    }
  }

  setAuthToken(token: string): void {
    useAuthStore.getState().setAccessToken(token);
  }

  clearAuthToken(): void {
    useAuthStore.getState().clear();
  }
}
