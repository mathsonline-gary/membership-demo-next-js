import { Timestamps } from './common'
import { User } from './user'

export interface Chat extends Timestamps {
  id: number
  last_message_sent_at: string
  participants: User[]
  last_message: ChatMessage
  messages?: ChatMessage[]
}

export interface ChatMessage extends Timestamps {
  id: number
  chat_id: number
  sender_id: number
  content: string
}
