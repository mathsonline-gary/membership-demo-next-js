import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export const useGetDeviceList = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: api.devices.index,
  })
}

export const useRevokeDevice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => api.devices.destroy(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })
}
