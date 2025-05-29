import { formatDistanceToNow } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useLastChats } from '@/hooks/use-api-query'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedUserId = searchParams.get('id')
  const { data: lastChats, isLoading } = useLastChats()

  const onUserSelect = (userId: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('id', userId.toString())
    router.replace(`/chat?${params.toString()}`)
  }

  return (
    <div className="w-80 px-4">
      <ScrollArea>
        <div className="space-y-1">
          {isLoading ? (
            <ReceiverSkeleton />
          ) : (
            lastChats?.map((chat) => (
              <button
                key={chat.id}
                className={cn(
                  'hover:bg-muted flex w-full items-center gap-2 rounded-lg p-2 text-left',
                  selectedUserId === chat.receiver_id.toString() && 'bg-muted'
                )}
                onClick={() => onUserSelect(chat.id)}
              >
                <Avatar>
                  <AvatarImage
                    src={chat.receiver?.avatar ?? ''}
                    alt={
                      chat.receiver?.first_name + ' ' + chat.receiver?.last_name
                    }
                  />
                  <AvatarFallback className="rounded-lg">
                    {chat.receiver?.first_name.charAt(0)}
                    {chat.receiver?.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">
                      {chat.receiver?.first_name +
                        ' ' +
                        chat.receiver?.last_name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(chat.created_at))}
                    </p>
                  </div>
                  <p className="text-muted-foreground truncate text-xs">
                    {chat.message}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

const ReceiverSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-18" />
      </div>
    </div>
  )
}
