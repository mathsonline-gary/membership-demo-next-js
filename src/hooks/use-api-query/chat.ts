import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { api, echo } from '@/lib/api'
import { Chat, ChatMessage } from '@/types'

export const useGetChats = () => {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => api.chat.index(user!.id),
    enabled: !!user,
    placeholderData: keepPreviousData,
  })
}

export const useGetChat = (chatId: number) => {
  const queryClient = useQueryClient()

  return useQuery<Chat>({
    queryKey: ['chats', chatId],
    queryFn: () => api.chat.show(chatId),
    select: (data: Chat) => {
      queryClient.setQueryData<Chat[]>(['chats'], (oldData) => {
        if (!oldData) return [data]
        return oldData.map((chat) => (chat.id === data.id ? data : chat))
      })
      return data
    },
    placeholderData: keepPreviousData,
  })
}

export const useSendChatMessage = (chatId: number) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (message: string) =>
      api.chat.messages.store(chatId, user!.id, message),
    onSuccess: (chatMessage: ChatMessage) => {
      queryClient.setQueryData<Chat>(['chats', chatId], (oldData) => {
        if (!oldData)
          return {
            id: chatId,
            last_message_sent_at: chatMessage.created_at,
            created_at: chatMessage.created_at,
            updated_at: chatMessage.created_at,
            participants: [user],
            last_message: chatMessage,
            messages: [chatMessage],
          } as Chat

        return {
          ...oldData,
          messages: [...(oldData.messages ?? []), chatMessage],
        }
      })
    },
  })
}

interface UseChatEchoOptions {
  onMessage?: (message: ChatMessage) => void
  onError?: (error: unknown) => void
}

export const useChatEcho = ({
  onMessage,
  onError,
}: UseChatEchoOptions = {}) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const hasSetupRef = useRef(false)

  useEffect(() => {
    if (!user || !echo || hasSetupRef.current) return

    try {
      hasSetupRef.current = true
      const channel = echo.private(`user.${user.id}`)

      channel.listen(
        '.chat.message.sent',
        (message: { chatMessage: ChatMessage }) => {
          const chatMessage = message.chatMessage

          // Update the specific chat's messages
          queryClient.setQueryData<Chat>(
            ['chats', chatMessage.chat_id],
            (oldData) => {
              if (!oldData) {
                return {
                  id: chatMessage.chat_id,
                  messages: [chatMessage],
                  last_message: chatMessage,
                  last_message_sent_at: chatMessage.created_at,
                  created_at: chatMessage.created_at,
                  updated_at: chatMessage.created_at,
                  participants: [],
                } as Chat
              }
              return {
                ...oldData,
                messages: [...(oldData.messages ?? []), chatMessage],
                last_message: chatMessage,
                last_message_sent_at: chatMessage.created_at,
                updated_at: chatMessage.created_at,
              }
            }
          )

          // Update the chat list to show the latest message
          queryClient.setQueryData<Chat[]>(['chats'], (oldData) => {
            if (!oldData) return []
            return oldData.map((chat) => {
              if (chat.id === chatMessage.chat_id) {
                return {
                  ...chat,
                  last_message: chatMessage,
                  last_message_sent_at: chatMessage.created_at,
                  updated_at: chatMessage.created_at,
                }
              }
              return chat
            })
          })

          onMessage?.(chatMessage)
        }
      )

      channel.error((error: unknown) => {
        onError?.(error)
      })
    } catch (error: unknown) {
      onError?.(error)
    }
  }, [user, onMessage, onError, queryClient])
}
