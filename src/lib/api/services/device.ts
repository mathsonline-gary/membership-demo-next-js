import { ApiResponse } from '@/types/api/common'
import { Device } from '@/types/user'

import { ApiClient } from '../client'
export const createDeviceService = (client: ApiClient) => ({
  index: async (): Promise<Device[]> => {
    const response = await client.get<ApiResponse<Device[]>>(`/api/devices`)
    return response.data
  },

  destroy: async (uuid: string): Promise<void> => {
    await client.delete(`/api/devices/${uuid}`)
  },
})

export type DeviceService = ReturnType<typeof createDeviceService>
