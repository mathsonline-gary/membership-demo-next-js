import { AuthUser } from '@/types'
import {
  ApiEmptyResponse,
  ApiResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '@/types/api'

import { Client } from '../client'

export const createAuthService = (client: Client) => ({
  csrf: async (): Promise<ApiEmptyResponse> => {
    await client.get<ApiEmptyResponse>('/sanctum/csrf-cookie')
  },

  register: async (data: RegisterRequest): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/auth/register', {
      ...data,
    })
  },

  login: async (data: LoginRequest): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/auth/login', {
      ...data,
      role: 'member',
    })
  },

  logout: async (): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/auth/logout')
  },

  user: async (): Promise<AuthUser> => {
    const response = await client.get<ApiResponse<AuthUser>>('/api/me')
    return response.data
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/auth/forgot-password', data)
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/auth/reset-password', data)
  },

  resendEmailVerification: async (): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/auth/email/verification-notification')
  },
})

export type AuthService = ReturnType<typeof createAuthService>
