export type RegisterRequest = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginRequest = {
  email: string
  password: string
  remember?: boolean
}

export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordRequest = {
  token: string
  email: string
  password: string
  password_confirmation: string
}
