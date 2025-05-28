import { ApiResponse } from '@/types/api/common'
import { Team } from '@/types/user'

import { Client } from '../client'

export const createTeamsService = (client: Client) => ({
  index: async (ownerId: number, searchQuery?: string): Promise<Team[]> => {
    const response = await client.get<ApiResponse<Team[]>>('/api/teams', {
      params: {
        owner_id: ownerId,
        search: searchQuery,
      },
    })
    return response.data
  },

  create: async (data: { name: string; owner_id: number }): Promise<Team> => {
    const response = await client.post<ApiResponse<Team>>('/api/teams', data)
    return response.data
  },

  update: async (id: number, data: { name: string }): Promise<Team> => {
    const response = await client.put<ApiResponse<Team>>(
      `/api/teams/${id}`,
      data
    )
    return response.data
  },

  destroy: async (id: number): Promise<void> => {
    await client.delete<ApiResponse<void>>(`/api/teams/${id}`)
  },

  members: {
    invite: async (teamId: number, data: { email: string }): Promise<void> => {
      await client.post<ApiResponse<void>>(
        `/api/teams/${teamId}/member-invitations`,
        data
      )
    },

    destroy: async (teamId: number, memberId: number): Promise<void> => {
      await client.delete<ApiResponse<void>>(
        `/api/teams/${teamId}/members/${memberId}`
      )
    },
  },
})

export type TeamsService = ReturnType<typeof createTeamsService>
