import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/api'
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

export const useSendChatMessage = (senderId: number, receiverId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (message: string) =>
      api.chat.store(senderId, receiverId, message),
    onSuccess: (chatMessage: ChatMessage) => {
      queryClient.setQueryData(
        ['chats', senderId, receiverId],
        (oldData: ChatMessage[]) => [...oldData, chatMessage]
      )
    },
  })
}
