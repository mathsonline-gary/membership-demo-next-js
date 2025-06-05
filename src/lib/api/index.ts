import { Client, createClient } from './client'
import { createEcho } from './echo'
import {
  createAuthService,
  createChatService,
  createDeviceService,
  createNotificationsService,
  createProfileService,
  createTeamsService,
} from './services'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

const createApi = (client: Client) => {
  return {
    profile: createProfileService(client),
    auth: createAuthService(client),
    devices: createDeviceService(client),
    teams: createTeamsService(client),
    notifications: createNotificationsService(client),
    chat: createChatService(client),
  }
}

export const api = createApi(
  createClient({ baseURL: BASE_URL, authDriver: 'token' })
)
export const echo = createEcho(
  createClient({ baseURL: BASE_URL, authDriver: 'token' })
)
