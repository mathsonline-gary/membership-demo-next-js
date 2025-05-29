import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

import { useAuth } from '@/hooks/use-auth'
import { api, echo } from '@/lib/api'
import { Notification, TeamMemberInvitationNotification } from '@/types'

export function useGetNotificationList() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return await api.notifications.index()
    },
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
        if (!old) return []
        return old.filter((notification) => notification.id !== id)
      })

      return await api.notifications.destroy(id)
    },
  })
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
        if (!old) return []
        return old.map((notification) =>
          notification.id === id
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      })

      return await api.notifications.markAsRead(id)
    },
  })
}

export function useMarkNotificationsAsUnread() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
        if (!old) return []
        return old.map((notification) =>
          notification.id === id
            ? { ...notification, read_at: null }
            : notification
        )
      })

      return await api.notifications.markAsUnread(id)
    },
  })
}

interface UseNotificationEchoOptions {
  onNotification?: (notification: Notification) => void
  onError?: (error: unknown) => void
}

export function useNotificationEcho({
  onNotification,
  onError,
}: UseNotificationEchoOptions = {}) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const hasSetupRef = React.useRef(false)

  React.useEffect(() => {
    if (!user || !echo || hasSetupRef.current) return

    try {
      hasSetupRef.current = true
      const channel = echo.private(`App.Models.User.${user.id}`)

      channel.notification((notification: TeamMemberInvitationNotification) => {
        const notificationData: Notification = {
          id: notification.id,
          type: notification.type,
          data: {
            team_id: notification.team_id,
            team_name: notification.team_name,
            inviter_id: notification.inviter_id,
            inviter_name: notification.inviter_name,
            inviter_avatar: notification.inviter_avatar,
            invitee_id: notification.invitee_id,
            invitee_name: notification.invitee_name,
          },
          read_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        console.log('new notification: ', notificationData)
        onNotification?.(notificationData)

        queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
          if (!old) return [notificationData]
          return [notificationData, ...old]
        })
      })
    } catch (error) {
      onError?.(error)
    }
  }, [user, onNotification, queryClient, onError])
}
