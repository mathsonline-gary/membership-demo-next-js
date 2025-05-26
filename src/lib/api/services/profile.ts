import { ApiResponse } from '@/types/api/common'
import { UpdateProfileRequest } from '@/types/api/profile'
import { Profile } from '@/types/user'

import { Client } from '../client'

export const createProfileService = (client: Client) => ({
  show: async (): Promise<Profile> => {
    const response = await client.get<ApiResponse<Profile>>(`/api/profile`)
    return response.data
  },

  update: async (data: UpdateProfileRequest): Promise<void> => {
    await client.put<void>(`/api/profile`, data)
  },
})

export type ProfileService = ReturnType<typeof createProfileService>
