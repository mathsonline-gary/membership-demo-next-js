import { formatDistanceToNow } from 'date-fns'
import { Bell } from 'lucide-react'
import Link from 'next/link'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetNotificationList } from '@/hooks/use-api-query/notifications'
import { cn } from '@/lib/utils'
export function Notifications() {
  const { data: notifications, isLoading } = useGetNotificationList()
  const unreadCount = notifications?.filter((n) => !n.read_at).length ?? 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-2 w-2 animate-ping items-center justify-center rounded-full bg-red-500 text-[10px] text-white"></span>
          )}
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div>
          {isLoading ? (
            <div className="text-muted-foreground text-center">
              <Loader />
            </div>
          ) : notifications?.length === 0 ? (
            <div className="text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications?.map((notification) => (
                <div key={notification.id}>
                  <div
                    className={cn(
                      'hover:bg-muted/50 flex items-start justify-between px-4 py-4',
                      !notification.read_at && 'bg-muted/30'
                    )}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{notification.type}</p>
                      <p className="text-muted-foreground text-sm">
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                    {!notification.read_at && (
                      <div className="ml-4 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter>
          <Button variant="outline" asChild>
            <Link href="/notifications">View all</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
