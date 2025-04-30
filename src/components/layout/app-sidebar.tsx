"use client";

import * as React from "react";
import Image from "next/image";
import {
  BookOpen,
  Bot,
  ChevronRightIcon,
  HelpCircle,
  Settings,
  SquareTerminal,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeSwitcher } from "./mode-switcher";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Playground",
      url: "#playground",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#history",
          isActive: true,
        },
        {
          title: "Starred",
          url: "#starred",
        },
        {
          title: "Settings",
          url: "#settings",
        },
      ],
    },
    {
      title: "Models",
      url: "#models",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#genesis",
        },
        {
          title: "Explorer",
          url: "#explorer",
        },
        {
          title: "Quantum",
          url: "#quantum",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#documentation",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#introduction",
        },
        {
          title: "Get Started",
          url: "#get-started",
        },
        {
          title: "Tutorials",
          url: "#tutorials",
        },
        {
          title: "Changelog",
          url: "#changelog",
        },
      ],
    },
    {
      title: "Tasks",
      url: "#tasks",
      icon: ClipboardList,
      items: [
        {
          title: "General",
          url: "#general",
        },
        {
          title: "Team",
          url: "#team",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  const imageProps = {
    expanded: {
      src: "/next.svg",
      width: 180,
      height: 38,
    },
    collapsed: {
      src: "/globe.svg",
      width: 32,
      height: 32,
    },
  }[state];

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="h-14 flex items-center justify-center">
        <SidebarGroup className={cn("py-0", state === "collapsed" && "px-0")}>
          <SidebarGroupContent>
            <Link href="/dashboard">
              <Image
                className="dark:invert"
                src={imageProps.src}
                alt="Logo"
                width={imageProps.width}
                height={imageProps.height}
                priority
              />
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <React.Fragment key={item.title}>
                {state === "collapsed" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={item.isActive || false}
                      >
                        {item.icon && <item.icon />}
                        <span className="sr-only">{item.title}</span>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="right"
                      align="start"
                      className="w-48"
                    >
                      {item.items?.map((subItem) => (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Collapsible
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={item.isActive || false}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem key="1">
              <SidebarMenuButton asChild>
                <a href={`/#1`}>
                  <span>Component 1</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="2">
              <SidebarMenuButton asChild>
                <a href={`/#2`}>
                  <span>Component 2</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-24">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#get-help">
                <HelpCircle />
                <span>Get Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <ModeSwitcher
                  variant={state === "collapsed" ? "icon" : "switch"}
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
