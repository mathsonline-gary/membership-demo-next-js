export type AuthUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  email_verified_at: string | null;
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
