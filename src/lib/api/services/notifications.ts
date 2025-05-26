import { ApiResponse } from '@/types/api/common'
import { Notification } from '@/types/notification'

import { Client } from '../client'

export const createNotificationsService = (client: Client) => ({
  index: async (): Promise<Notification[]> => {
    const response =
      await client.get<ApiResponse<Notification[]>>('/api/notifications')
    return response.data
  },

  markAsRead: async (id: string): Promise<void> => {
    await client.post<void>(`/api/notifications/${id}/read`)
  },

  markAsUnread: async (id: string): Promise<void> => {
    await client.post<void>(`/api/notifications/${id}/unread`)
  },

  markAllAsRead: async (): Promise<void> => {
    await client.post<void>('/api/notifications/read-all')
  },

  delete: async (id: string): Promise<void> => {
    await client.delete<void>(`/api/notifications/${id}`)
  },
})

export type NotificationsService = ReturnType<typeof createNotificationsService>
