import { ChatMessages } from './chat-messages'
import { ComposeChat } from './compose-chat'

interface ChatContainerProps {
  chatId: string | null
}

export function ChatContainer({ chatId }: ChatContainerProps) {
  return (
    <div className="flex-1 px-4">
      {chatId ? <ChatMessages chatId={Number(chatId)} /> : <ComposeChat />}
    </div>
  )
}
