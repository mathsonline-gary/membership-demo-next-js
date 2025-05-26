import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { ChannelAuthorizationData } from 'pusher-js/types/src/core/auth/options'

import { Client } from './client'

declare global {
  interface Window {
    Pusher: typeof Pusher
  }
}

export function createEcho(client: Client) {
  if (typeof window !== 'undefined') {
    window.Pusher = Pusher

    return new Echo({
      broadcaster: 'reverb',
      encrypted: true,
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            client
              .post<ChannelAuthorizationData>('/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((data) => {
                callback(null, data)
              })
              .catch((error) => {
                callback(error, null)
              })
          },
        }
      },
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
      wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '8080'),
      wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '8080'),
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
    })
  }
}
