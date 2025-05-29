import { Client } from '@/lib/api/client'
import { ApiResponse } from '@/types/api/common'
import { Chat, ChatMessage } from '@/types/chat'

export const createChatService = (client: Client) => ({
  index: async (targetUserId: number): Promise<Chat[]> => {
    const response = await client.get<ApiResponse<Chat[]>>(`/api/chats`, {
      params: {
        target_user_id: targetUserId,
      },
    })
    return response.data
  },

  show: async (chatId: number): Promise<Chat> => {
    const response = await client.get<ApiResponse<Chat>>(`/api/chats/${chatId}`)
    return response.data
  },

  create: async (
    senderId: number,
    receiverId: number,
    message: string
  ): Promise<ChatMessage> => {
    const response = await client.post<ApiResponse<ChatMessage>>(`/api/chats`, {
      sender_id: senderId,
      receiver_id: receiverId,
      message,
    })
    return response.data
  },
})

export const createChatMessageService = (client: Client) => ({})
