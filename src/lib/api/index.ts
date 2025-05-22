import { createApiClient } from './client'
import {
  createAuthService,
  createDeviceService,
  createNotificationsService,
  createProfileService,
  createStudentService,
  createTeamsService,
} from './services'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

const createApi = () => {
  const client = createApiClient(BASE_URL)

  return {
    profile: createProfileService(client),
    auth: createAuthService(client),
    devices: createDeviceService(client),
    teams: createTeamsService(client),
    students: createStudentService(client),
    notifications: createNotificationsService(client),
  }
}

export const api = createApi()
