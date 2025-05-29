import { Notification } from '@/types'
import { ApiEmptyResponse, ApiResponse } from '@/types/api'

import { Client } from '../client'

export const createNotificationsService = (client: Client) => ({
  index: async (): Promise<Notification[]> => {
    const response =
      await client.get<ApiResponse<Notification[]>>('/api/notifications')
    return response.data
  },

  markAsRead: async (id: string): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>(`/api/notifications/${id}/read`)
  },

  markAsUnread: async (id: string): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>(`/api/notifications/${id}/unread`)
  },

  markAllAsRead: async (): Promise<ApiEmptyResponse> => {
    await client.post<ApiEmptyResponse>('/api/notifications/read-all')
  },

  destroy: async (id: string): Promise<ApiEmptyResponse> => {
    await client.delete<ApiEmptyResponse>(`/api/notifications/${id}`)
  },
})

export type NotificationsService = ReturnType<typeof createNotificationsService>
