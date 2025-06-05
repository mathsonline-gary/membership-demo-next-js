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
  created_at: string
  updated_at: string
  role: UserRole
}

export interface AuthUser extends User {
  email_verified_at: string | null
}

export type Profile = AuthUser

export interface Admin extends User {
  role: UserRole.ADMIN
}

export interface Member extends User {
  role: UserRole.MEMBER
}

export interface TeamMember extends Member {
  pivot: {
    status: string
    created_at: string
    updated_at: string
  }
}

export type Team = {
  id: number
  name: string
  owner_id: number
  owner: Member
  members: TeamMember[]
  created_at: string
  updated_at: string
}

export type Device = {
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
