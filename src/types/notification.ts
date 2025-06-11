import { Timestamps } from './common'

interface BaseNotification extends Timestamps {
  id: string
  type: string
}
export interface Notification extends BaseNotification {
  data: Record<string, unknown>
  read_at: string | null
}

export interface TeamMemberInvitationNotification extends BaseNotification {
  team_id: number
  team_name: string
  inviter_id: number
  inviter_name: string
  inviter_avatar: string
  invitee_id: number
  invitee_name: string
}
