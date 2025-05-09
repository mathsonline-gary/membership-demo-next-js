"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  HelpCircle,
  Settings,
  Home,
  Users,
  Wrench,
  BookOpen,
  BookCheck,
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
import { ModeSwitcher } from "@/app/(app)/_components/mode-switcher";
import { usePathname } from "next/navigation";

const MENU_1_ITEMS: AppSidebarMenuItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "People",
    url: "#people",
    icon: Users,
    items: [
      {
        title: "Teams",
        url: "/teams",
      },
      {
        title: "Students",
        url: "/students",
      },
    ],
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Lessons",
    url: "/lessons",
    icon: BookCheck,
  },
];

const MENU_2_ITEMS: AppSidebarMenuItem[] = [
  {
    title: "Tools",
    url: "/tools",
    icon: Wrench,
    items: [
      {
        title: "Export Data",
        url: "/tools/export",
      },
      {
        title: "Upload Date",
        url: "/tools/upload",
      },
    ],
  },
  {
    title: "Documentation",
    url: "/documentation",
    icon: BookOpen,
    items: [
      {
        title: "Get Started",
        url: "/documentation/get-started",
      },
      {
        title: "Tutorials",
        url: "/documentation/tutorials",
      },
    ],
  },
];

type AppSidebarMenuItem = {
  title: string;
  url: string;
  icon?: React.ElementType;
  items?: AppSidebarMenuItem[];
};

function AppSidebarMenu({
  menu,
  isActiveItem,
}: {
  menu: AppSidebarMenuItem[];
  isActiveItem: (item: AppSidebarMenuItem) => boolean;
}) {
  const { state } = useSidebar();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {menu.map((item) => (
        <React.Fragment key={item.title}>
          {item.items ? (
            // Submenu items
            state === "collapsed" && !isMobile ? (
              // Collapsed & non-mobile
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActiveItem(item)}
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
                      <SidebarLink href={subItem.url}>
                        <span>{subItem.title}</span>
                      </SidebarLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Expanded & non-mobile
              <Collapsible
                asChild
                defaultOpen={isActiveItem(item)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActiveItem(item)}
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
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActiveItem(subItem)}
                          >
                            <SidebarLink
                              href={subItem.url}
                              isActive={isActiveItem(subItem)}
                            >
                              <span>{subItem.title}</span>
                            </SidebarLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          ) : (
            // Single item
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActiveItem(item)}>
                <SidebarLink href={item.url} isActive={isActiveItem(item)}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </React.Fragment>
      ))}
    </SidebarMenu>
  );
}

function SidebarLink({
  href,
  children,
  isActive,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Disable navigation if the item is active
    if (isActive ?? false) {
      e.preventDefault();
    }

    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleNavigation}
      className="flex items-center gap-2"
      {...props}
    >
      {children}
    </Link>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile } = useSidebar();
  const pathname = usePathname();
  const imageProps = isMobile
    ? {
        src: "/logo-icon-text.png",
        width: 180,
        height: 43,
      }
    : {
        expanded: {
          src: "/logo-icon-text.png",
          width: 180,
          height: 43,
        },
        collapsed: {
          src: "/logo-icon.png",
          width: 32,
          height: 28,
        },
      }[state];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isActiveItem = (item: AppSidebarMenuItem) => {
    return (
      item.items?.some((subItem) => isActive(subItem.url)) || isActive(item.url)
    );
  };

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="h-14 flex items-center justify-center">
        <SidebarGroup
          className={cn("py-0", !isMobile && state === "collapsed" && "px-0")}
        >
          <SidebarGroupContent>
            <SidebarLink href="/dashboard">
              <Image
                className="dark:invert"
                style={{
                  width: `${imageProps.width}px`,
                  height: `${imageProps.height}px`,
                }}
                src={imageProps.src}
                alt="Logo"
                width={imageProps.width}
                height={imageProps.height}
                priority
              />
            </SidebarLink>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <AppSidebarMenu menu={MENU_1_ITEMS} isActiveItem={isActiveItem} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <AppSidebarMenu menu={MENU_2_ITEMS} isActiveItem={isActiveItem} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-24">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")}>
              <SidebarLink href="/settings" isActive={isActive("/settings")}>
                <Settings />
                <span>Settings</span>
              </SidebarLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <SidebarLink href="#get-help">
                <HelpCircle />
                <span>Get Help</span>
              </SidebarLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <ModeSwitcher
                  variant={
                    state === "collapsed" && !isMobile ? "icon" : "switch"
                  }
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
