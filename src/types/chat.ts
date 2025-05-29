import { User } from './user'

export type ChatMessage = {
  id: number
  sender_id: number
  receiver_id: number
  message: string
  read_at: string | null
  created_at: string
  updated_at: string
  sender?: User
  receiver?: User
}
