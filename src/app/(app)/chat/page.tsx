'use client'

import { MainContainer } from '@/app/(app)/_components/main-container'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useChatEcho } from '@/hooks/use-api-query/chat'

import { ChatContainer } from './_components/chat-container'
import { Sidebar } from './_components/sidebar'

export default function ChatPage() {
  useChatEcho({})

  return (
    <MainContainer title="Chat">
      <Card className="flex h-full flex-row gap-4 px-4">
        <Sidebar />
        <Separator orientation="vertical" className="h-full" />
        <ChatContainer />
      </Card>
    </MainContainer>
  )
}
