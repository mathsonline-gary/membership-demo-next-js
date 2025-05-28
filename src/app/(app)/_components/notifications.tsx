'use client'

import { formatDistanceToNow } from 'date-fns'
import { Bell, Check, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Loader } from '@/components/loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  useDeleteNotification,
  useGetNotificationList,
  useMarkNotificationAsRead,
  useMarkNotificationsAsUnread,
  useNotificationEcho,
} from '@/hooks/use-api-query/notifications'
import { cn } from '@/lib/utils'
import { Notification } from '@/types/notification'

export function Notifications() {
  const { data: notifications, isLoading } = useGetNotificationList()
  const [activeTab, setActiveTab] = useState('all')
  const unreadCount = notifications?.filter((n) => !n.read_at).length ?? 0
  const { mutate: markNotificationAsRead } = useMarkNotificationAsRead()
  const { mutate: deleteNotification } = useDeleteNotification()
  const { mutate: markNotificationsAsUnread } = useMarkNotificationsAsUnread()

  useNotificationEcho()

  const filteredNotifications = notifications?.filter((notification) => {
    if (activeTab === 'unread') {
      return !notification.read_at
    }
    return true
  })

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
          <SheetDescription>
            List of your notifications and their status
          </SheetDescription>
        </SheetHeader>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            <div className="overflow-y-auto">
              {isLoading ? (
                <div className="text-muted-foreground text-center">
                  <Loader />
                </div>
              ) : filteredNotifications?.length === 0 ? (
                <div className="text-muted-foreground text-center">
                  No notifications
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifications?.map((notification) => (
                    <div key={notification.id} className="group">
                      <div
                        className={cn(
                          'hover:bg-muted/50 relative flex items-start justify-between px-4 py-4',
                          !notification.read_at && 'bg-muted/30'
                        )}
                      >
                        <div>
                          <div className="font-medium">
                            {notification.type === 'team-member-invited' ? (
                              <TeamMemberInvitedNotification
                                notification={notification}
                              />
                            ) : (
                              notification.type
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {formatDistanceToNow(
                              new Date(notification.created_at),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          {!notification.read_at && (
                            <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                          )}
                          <div className="invisible absolute right-2 bottom-2 flex items-center gap-1 group-hover:visible">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      if (notification.read_at) {
                                        markNotificationsAsUnread(
                                          notification.id
                                        )
                                      } else {
                                        markNotificationAsRead(notification.id)
                                      }
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        '',
                                        notification.read_at && 'text-green-500'
                                      )}
                                    />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {notification.read_at
                                    ? 'Mark as unread'
                                    : 'Mark as read'}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                  >
                                    <Trash2 />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <SheetFooter>
          <Button variant="outline" asChild>
            <Link href="/notifications">View all</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function TeamMemberInvitedNotification({
  notification,
}: {
  notification: Notification
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={notification.data.inviter_avatar as string}
          alt={notification.data.inviter_name as string}
        />
        <AvatarFallback>
          {(notification.data.inviter_name as string)?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p>
        {notification.data.invitee_name as string} invited you to join{' '}
        {notification.data.team_name as string}
      </p>
    </div>
  )
}
