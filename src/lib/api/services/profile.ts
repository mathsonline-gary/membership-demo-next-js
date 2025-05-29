import { Profile } from '@/types'
import {
  ApiEmptyResponse,
  ApiResponse,
  UpdateProfileRequest,
} from '@/types/api'

import { Client } from '../client'

export const createProfileService = (client: Client) => ({
  show: async (): Promise<Profile> => {
    const response = await client.get<ApiResponse<Profile>>(`/api/profile`)
    return response.data
  },

  update: async (data: UpdateProfileRequest): Promise<ApiEmptyResponse> => {
    const formData = new FormData()
    if (data.first_name) {
      console.log(data.first_name)
      formData.append('first_name', data.first_name)
    }
    if (data.last_name) {
      console.log(data.last_name)
      formData.append('last_name', data.last_name)
    }
    if (data.avatar instanceof File) {
      console.log(data.avatar)
      formData.append('avatar', data.avatar)
    }

    await client.post<ApiEmptyResponse>(`/api/profile`, formData)
  },
})

export type ProfileService = ReturnType<typeof createProfileService>
