import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/api'

export const useGetDeviceList = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['devices'],
    queryFn: () => api.devices.index(user!.id),
    enabled: !!user,
  })
}

export const useRevokeDevice = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (uuid: string) => api.devices.destroy(user!.id, uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })
}
