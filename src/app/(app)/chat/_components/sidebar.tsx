import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetChats } from '@/hooks/use-api-query/chat'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeChatId: string | null
}

export function Sidebar({ activeChatId }: SidebarProps) {
  const { data: chats, isLoading } = useGetChats()
  const { user } = useAuth()

  return (
    <ScrollArea>
      <ul className="w-80 space-y-1">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <ItemSkeleton />
              </li>
            ))
          : chats?.map((chat) => (
              <li
                key={chat.id}
                className={cn(
                  'hover:bg-muted flex w-full items-center gap-2 rounded-lg p-2 text-left',
                  activeChatId === chat.id.toString() && 'bg-muted'
                )}
              >
                <Link
                  href={`/chat?id=${chat.id}`}
                  className="flex w-full items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage
                      src={chat.participants[0].avatar ?? ''}
                      alt={
                        chat.participants[0].first_name +
                        ' ' +
                        chat.participants[0].last_name
                      }
                    />
                    <AvatarFallback className="rounded-lg">
                      {chat.participants
                        .find((participant) => participant.id !== user?.id)
                        ?.first_name.charAt(0)}
                      {chat.participants
                        .find((participant) => participant.id !== user?.id)
                        ?.last_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {
                          chat.participants.find(
                            (participant) => participant.id !== user?.id
                          )?.full_name
                        }
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatDistanceToNow(
                          new Date(chat.last_message_sent_at)
                        )}
                      </p>
                    </div>
                    <p className="text-muted-foreground line-clamp-1 text-xs">
                      {chat.last_message.content}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </ScrollArea>
  )
}

const ItemSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg p-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="mt-1 h-3 w-32" />
      </div>
    </div>
  )
}
