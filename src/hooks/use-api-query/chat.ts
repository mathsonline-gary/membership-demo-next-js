import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/api'
import { ChatMessage } from '@/types/chat'

export const useLastChats = () => {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['last-chats'],
    queryFn: () => api.chat.index(user!.id, null, true),
    placeholderData: keepPreviousData,
  })
}

export const useChatMessages = (receiverId: number) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['chats', receiverId],
    queryFn: () => api.chat.index(user!.id, receiverId),
  })
}

export const useSendChatMessage = (senderId: number, receiverId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (message: string) =>
      api.chat.create(senderId, receiverId, message),
    onSuccess: (chatMessage: ChatMessage) => {
      queryClient.setQueryData(
        ['chats', senderId, receiverId],
        (oldData: ChatMessage[]) => [...oldData, chatMessage]
      )
    },
  })
}
