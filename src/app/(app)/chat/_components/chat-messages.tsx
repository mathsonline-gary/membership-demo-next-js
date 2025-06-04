import { zodResolver } from '@hookform/resolvers/zod'
import { formatDistanceToNow } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Avatar } from '@/components/avatar'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetChat, useSendChatMessage } from '@/hooks/use-api-query/chat'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { ChatMessage, User } from '@/types'

const messageFormSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
})

type MessageFormValues = z.infer<typeof messageFormSchema>

interface ChatMessagesProps {
  chatId: number
}

export function ChatMessages({ chatId }: ChatMessagesProps) {
  const { data: chat, isFetching } = useGetChat(chatId)
  const { user } = useAuth()
  const { mutate: sendMessage, isPending } = useSendChatMessage(chatId)

  const participants = chat?.participants.filter((participant) => {
    if (participant.id === user?.id) return false
    return true
  })

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: '',
    },
  })

  function onSubmit(data: MessageFormValues) {
    sendMessage(data.message)
    form.reset()
  }

  return (
    <div className="flex h-full flex-col gap-y-4">
      {participants?.length === 1 ? (
        <div className="flex items-center gap-2">
          <Avatar user={participants[0]} className="size-10" />
          <div>
            <h2 className="font-semibold">{participants[0]?.full_name}</h2>
            <p className="text-muted-foreground text-sm">
              {participants[0]?.email}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center -space-x-4">
          {participants?.map((participant) => (
            <Avatar
              key={participant.id}
              user={participant}
              className="border-background size-10 border-4"
            />
          ))}
        </div>
      )}

      <Separator />

      <ScrollArea className="flex-1">
        <div className="space-y-8">
          {isFetching
            ? Array.from({ length: 4 }).map((_, i) => (
                <MessageBoxSkeleton key={i} isCurrentUser={i % 2 === 1} />
              ))
            : chat?.messages?.map((message) => {
                const sender = chat.participants.find(
                  (participant) => participant.id === message.sender_id
                )
                return (
                  <MessageBox
                    key={message.id}
                    message={message}
                    sender={sender}
                    currentUserId={user?.id}
                  />
                )
              })}
        </div>
      </ScrollArea>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Type a message..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader /> : 'Send'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

const MessageBoxSkeleton = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-4',
        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isCurrentUser && (
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      )}
      <div
        className={cn(
          'flex flex-col',
          isCurrentUser ? 'items-end' : 'items-start',
          'flex-1'
        )}
      >
        <div className="mb-1 flex items-baseline gap-2">
          {!isCurrentUser && <Skeleton className="h-4 w-24" />}
          <Skeleton className="h-3 w-16" />
        </div>
        <div
          className={cn(
            'mt-1 max-w-[80%] rounded-lg px-4 py-2',
            isCurrentUser ? 'bg-primary/60 ml-auto' : 'bg-muted'
          )}
        >
          <Skeleton className="mb-2 h-4 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  )
}

const MessageBox = ({
  message,
  sender,
  currentUserId,
}: {
  message: ChatMessage
  sender?: User
  currentUserId?: number
}) => {
  const isCurrentUser = message.sender_id === currentUserId

  if (!sender) return null

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4',
        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isCurrentUser && <Avatar user={sender} />}
      <div
        className={cn(
          'flex flex-col',
          isCurrentUser ? 'items-end' : 'items-start',
          'flex-1'
        )}
      >
        <div className="flex items-baseline gap-2">
          {!isCurrentUser && (
            <span className="text-sm font-medium">{sender.full_name}</span>
          )}
          <span className="text-xs opacity-70">
            {formatDistanceToNow(new Date(message.created_at))}
          </span>
        </div>

        <div
          className={cn(
            'mt-1 max-w-[80%] rounded-lg px-4 py-2 break-words',
            isCurrentUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          )}
        >
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  )
}
