export interface Notification {
  id: number
  type: string
  notifiable_type: string
  notifiable_id: number
  data: Record<string, unknown>
  read_at: string | null
  created_at: string
  updated_at: string
}
