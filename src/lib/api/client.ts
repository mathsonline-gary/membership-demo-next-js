import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from 'axios'

import { ApiErrorResponse } from '@/types/api'

import { ApiError } from './error'

interface ClientOptions {
  baseURL: string
  authDriver: 'session' | 'token'
}

export const createClient = ({ baseURL, authDriver }: ClientOptions) => {
  const client: AxiosInstance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: authDriver === 'session',
    withXSRFToken: authDriver === 'session',
  })

  const setupInterceptors = () => {
    client.interceptors.request.use((config) => {
      if (authDriver === 'token') {
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    })

    client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (!error.response) {
          throw new ApiError(
            0,
            'Network error. Please check your connection.',
            {},
            error
          )
        }

        if (error.code === 'ECONNABORTED') {
          throw new ApiError(0, 'Request timeout. Please try again.', {}, error)
        }

        // Handle server errors
        if (error.response.status >= 500) {
          throw new ApiError(
            error.response.status,
            'Server error. Please try again later.',
            error.response.data?.errors || {},
            error
          )
        }

        // Handle client errors
        throw new ApiError(
          error.response.status,
          error.response.data?.message || error.message,
          error.response.data?.errors || {},
          error
        )
      }
    )
  }

  setupInterceptors()

  const request = async <T>(
    method: Method,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await client.request<T>({
      method,
      url,
      data,
      ...config,
    })

    return response.data
  }

  return {
    request,
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>('GET', url, undefined, config),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>('POST', url, data, config),
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>('PUT', url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>('DELETE', url, undefined, config),
  }
}

export type Client = ReturnType<typeof createClient>
