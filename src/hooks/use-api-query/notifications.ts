import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useGetNotificationList() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return await api.notifications.index()
    },
  })
}
