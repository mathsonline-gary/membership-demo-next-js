import { useSearchParams } from 'next/navigation'

import { ChatMessages } from './chat-messages'
import { ComposeChat } from './compose-chat'

export function ChatContainer() {
  const searchParams = useSearchParams()
  const selectedReceiverId = searchParams.get('id')

  return (
    <div className="flex-1 px-4">
      {selectedReceiverId ? <ChatMessages /> : <ComposeChat />}
    </div>
  )
}
