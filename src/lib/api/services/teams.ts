import { Team } from '@/types'
import { ApiEmptyResponse, ApiResponse } from '@/types/api'

import { Client } from '../client'

export const createTeamsService = (client: Client) => ({
  index: async (ownerId: number, searchQuery?: string): Promise<Team[]> => {
    const response = await client.get<ApiResponse<Team[]>>('/api/teams', {
      params: {
        owner_id: ownerId,
        search: searchQuery,
        with: ['members', 'owner'],
      },
    })
    return response.data
  },

  create: async (data: { name: string; owner_id: number }): Promise<Team> => {
    const response = await client.post<ApiResponse<Team>>('/api/teams', data)
    return response.data
  },

  update: async (
    id: number,
    data: { name: string }
  ): Promise<ApiEmptyResponse> => {
    await client.put<ApiEmptyResponse>(`/api/teams/${id}`, data)
  },

  destroy: async (id: number): Promise<ApiEmptyResponse> => {
    await client.delete<ApiEmptyResponse>(`/api/teams/${id}`)
  },

  members: {
    invite: async (
      teamId: number,
      data: { email: string }
    ): Promise<ApiEmptyResponse> => {
      await client.post<ApiEmptyResponse>(
        `/api/teams/${teamId}/member-invitations`,
        data
      )
    },

    destroy: async (
      teamId: number,
      memberId: number
    ): Promise<ApiEmptyResponse> => {
      await client.delete<ApiEmptyResponse>(
        `/api/teams/${teamId}/members/${memberId}`
      )
    },
  },
})

export type TeamsService = ReturnType<typeof createTeamsService>
