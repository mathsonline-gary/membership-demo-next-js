import { ApiResponse } from '@/types/api/common'
import { User } from '@/types/user'

import { ApiClient } from '../client'
export const createStudentService = (client: ApiClient) => ({
  index: async (search: string | null) => {
    const response = await client.get<ApiResponse<User[]>>('/api/students', {
      params: {
        search,
      },
    })
    return response.data
  },
})

export type StudentService = ReturnType<typeof createStudentService>
