import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/api'
import type { Team } from '@/types'

export const useGetTeamList = (searchQuery?: string) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['teams', searchQuery],
    queryFn: () => api.teams.index(user?.id ?? 0, searchQuery),
    refetchOnWindowFocus: false,
  })
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      api.teams.update(id, { name }),
    onSuccess: ({ id, name }) => {
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['teams'], exact: false })
        .forEach((query) => {
          queryClient.setQueryData<Team[] | undefined>(
            query.queryKey,
            (oldTeams) => {
              if (!oldTeams) return oldTeams
              return oldTeams.map((team) =>
                team.id === id ? { ...team, name } : team
              )
            }
          )
        })
    },
  })
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (data: { name: string }) =>
      api.teams.create({ ...data, owner_id: user?.id ?? 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'], exact: false })
    },
  })
}

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.teams.destroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'], exact: false })
    },
  })
}

export const useInviteTeamMember = () => {
  return useMutation({
    mutationFn: (data: { teamId: number; email: string }) =>
      api.teams.members.invite(data.teamId, { email: data.email }),
  })
}

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { teamId: number; memberId: number }) =>
      api.teams.members.destroy(data.teamId, data.memberId),
    onSuccess: (_, { teamId, memberId }) => {
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['teams'], exact: false })
        .forEach((query) => {
          queryClient.setQueryData<Team[] | undefined>(
            query.queryKey,
            (oldTeams) => {
              if (!oldTeams) return oldTeams
              return oldTeams.map((team) =>
                team.id === teamId
                  ? {
                      ...team,
                      members: team.members.filter((m) => m.id !== memberId),
                    }
                  : team
              )
            }
          )
        })
    },
  })
}
