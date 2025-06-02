import { User } from './user'

export type Chat = {
  id: number
  last_message_sent_at: string
  created_at: string
  updated_at: string
  participants: User[]
  last_message: ChatMessage
  messages?: ChatMessage[]
}

export type ChatMessage = {
  id: number
  chat_id: number
  sender_id: number
  content: string
  created_at: string
  updated_at: string
}
