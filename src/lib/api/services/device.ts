import { Client } from '@/lib/api/client'
import { ApiResponse } from '@/types/api/common'
import { Device } from '@/types/user'

export const createDeviceService = (client: Client) => ({
  index: async (userId: number): Promise<Device[]> => {
    const response = await client.get<ApiResponse<Device[]>>(
      `/api/users/${userId}/devices`
    )
    return response.data
  },

  destroy: async (userId: number, uuid: string): Promise<void> => {
    await client.delete(`/api/users/${userId}/devices/${uuid}`)
  },
})

export type DeviceService = ReturnType<typeof createDeviceService>
