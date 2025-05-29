import { Client } from '@/lib/api/client'
import { Device } from '@/types'
import { ApiEmptyResponse, ApiResponse } from '@/types/api'

export const createDeviceService = (client: Client) => ({
  index: async (userId: number): Promise<Device[]> => {
    const response = await client.get<ApiResponse<Device[]>>(
      `/api/users/${userId}/devices`
    )
    return response.data
  },

  destroy: async (userId: number, uuid: string): Promise<ApiEmptyResponse> => {
    await client.delete<ApiEmptyResponse>(
      `/api/users/${userId}/devices/${uuid}`
    )
  },
})

export type DeviceService = ReturnType<typeof createDeviceService>
