export enum UserRole {
  TEACHER = "teacher",
  STUDENT = "student",
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  role: UserRole;
}

export interface AuthUser extends User {
  email_verified_at: string | null;
}

export type Profile = AuthUser;

export interface Teacher extends User {
  role: UserRole.TEACHER;
}

export interface Student extends User {
  role: UserRole.STUDENT;
}

export type Team = {
  id: number;
  name: string;
  owner_id: number;
  owner: Teacher;
  members: Student[];
  created_at: string;
  updated_at: string;
};

export type Device = {
  uuid: string;
  user_id: number;
  ip_address: string;
  browser: string | null;
  platform: string | null;
  device_type: string | null;
  device_name: string | null;
  is_robot: boolean;
  robot_name: string | null;
  last_used_at: string | null;
  is_current: boolean;
};
