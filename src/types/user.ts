import { Timestamps } from './common'

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export interface AccessToken {
  token: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  full_name: string
  email: string
  avatar: string | null
  role: UserRole
}

export interface AuthUser extends User, Timestamps {
  email_verified_at: string | null
}

export type Profile = AuthUser

export interface TeamMember extends User {
  status: string
  invited_at: string
  joined_at: string | null
}

export interface Team extends Timestamps {
  id: number
  name: string
  owner_id: number
  owner: User
  members: TeamMember[]
}

export interface Device {
  uuid: string
  user_id: number
  ip_address: string
  browser: string | null
  platform: string | null
  device_type: string | null
  device_name: string | null
  is_robot: boolean
  robot_name: string | null
  last_used_at: string | null
  is_current: boolean
}
