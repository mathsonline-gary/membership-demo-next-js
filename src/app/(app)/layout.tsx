"use client";

import { AppSidebar } from "@/app/(app)/_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/app/(app)/_components/nav-user";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider middleware="auth">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
            <div className="flex h-14 w-full items-center gap-2 px-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger className="-ml-1.5" />
                  </TooltipTrigger>
                  <TooltipContent>Show/Hide Sidebar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="ml-auto flex items-center gap-2">
                <NavUser />
              </div>
            </div>
          </header>
          <div className="@container grid gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
