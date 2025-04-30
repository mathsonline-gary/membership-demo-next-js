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
  Home,
  Users,
  Wrench,
  ClipboardCheck,
  BookOpenCheck,
  PiggyBank,
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
const MENU_1_ITEMS: AppSidebarMenu[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Tasks",
    url: "#tasks",
    icon: ClipboardCheck,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "#overview",
        isActive: true,
      },
      {
        title: "Course Plans",
        url: "#course-plans",
      },
      {
        title: "Weekly Revisions",
        url: "#weekly-revisions",
      },
    ],
  },
  {
    title: "Exams",
    url: "#exams",
    icon: BookOpenCheck,
  },
  {
    title: "Question Bank",
    url: "#question-bank",
    icon: PiggyBank,
  },
];

const MENU_2_ITEMS: AppSidebarMenu[] = [
  {
    title: "People",
    url: "#people",
    icon: Users,
    items: [
      {
        title: "Classes",
        url: "#classes",
      },
      {
        title: "Teachers",
        url: "#teachers",
      },
      {
        title: "Students",
        url: "#students",
      },
    ],
  },
  {
    title: "Tools",
    url: "#tools",
    icon: Wrench,
  },
];

type AppSidebarMenu = {
  title: string;
  url: string;
  icon?: React.ElementType;
  isActive?: boolean;
  items?: AppSidebarMenu[];
};

function AppSidebarMenu({ menu }: { menu: AppSidebarMenu[] }) {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      {menu.map((item) => (
        <React.Fragment key={item.title}>
          {item.items ? (
            state === "collapsed" ? (
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
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center gap-2">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </React.Fragment>
      ))}
    </SidebarMenu>
  );
}

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
          <AppSidebarMenu menu={MENU_1_ITEMS} />
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <AppSidebarMenu menu={MENU_2_ITEMS} />
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
