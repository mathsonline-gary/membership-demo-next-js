'use client'

import { AppSidebar } from '@/app/(app)/_components/app-sidebar'
import { NavUser } from '@/app/(app)/_components/nav-user'
import { Notifications } from '@/app/(app)/_components/notifications'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AuthProvider } from '@/providers/auth-provider'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="max-h-svh">
          <header className="bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b">
            <div className="flex h-14 w-full items-center gap-2 px-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger className="justify-start" />
                  </TooltipTrigger>
                  <TooltipContent>Show/Hide Sidebar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="ml-auto flex items-center gap-2">
                <Notifications />
                <NavUser />
              </div>
            </div>
          </header>
          <div className="flex min-h-0 flex-1 flex-col px-4 py-2">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
