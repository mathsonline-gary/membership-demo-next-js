import { Client } from '@/lib/api/client'
import { ApiResponse } from '@/types/api/common'
import { ChatMessage } from '@/types/chat'

export const createChatService = (client: Client) => ({
  index: async (
    senderId: number,
    receiverId: number | null,
    lastChatOnly: boolean = false
  ): Promise<ChatMessage[]> => {
    const response = await client.get<ApiResponse<ChatMessage[]>>(
      `/api/chats`,
      {
        params: {
          sender_id: senderId,
          receiver_id: receiverId,
          last_chat_only: lastChatOnly,
        },
      }
    )
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
