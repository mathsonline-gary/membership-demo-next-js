import { ChatMessages } from './chat-messages'
import { ComposeChat } from './compose-chat'

interface ChatContainerProps {
  chatId: string | null
}

export function ChatContainer({ chatId }: ChatContainerProps) {
  return (
    <div className="flex flex-1 flex-col px-4">
      {chatId ? <ChatMessages chatId={Number(chatId)} /> : <ComposeChat />}
    </div>
  )
}
