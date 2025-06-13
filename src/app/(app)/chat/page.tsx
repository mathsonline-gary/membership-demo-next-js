'use client'

import { useSearchParams } from 'next/navigation'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useChatEcho } from '@/hooks/use-api-query/chat'

import { MainContainer } from '../_components/main-container'

import { ChatContainer } from './_components/chat-container'
import { Sidebar } from './_components/sidebar'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')

  useChatEcho({})

  return (
    <MainContainer title="Chat" scrollable={false}>
      <Card className="flex min-h-0 flex-1 flex-row gap-4 px-4">
        <Sidebar activeChatId={chatId} />
        <Separator orientation="vertical" className="h-full" />
        <ChatContainer chatId={chatId} />
      </Card>
    </MainContainer>
  )
}
