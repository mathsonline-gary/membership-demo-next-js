import { ApiResponse } from '@/types/api/common'
import { Notification } from '@/types/notification'

import { ApiClient } from '../client'

export const createNotificationsService = (client: ApiClient) => ({
  index: async (): Promise<Notification[]> => {
    const response =
      await client.get<ApiResponse<Notification[]>>('/api/notifications')
    return response.data
  },
})

export type NotificationsService = ReturnType<typeof createNotificationsService>
