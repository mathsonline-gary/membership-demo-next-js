"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbContextType = {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
  clearBreadcrumbs: () => void;
};

const BreadcrumbContext = React.createContext<
  BreadcrumbContextType | undefined
>(undefined);

export function useBreadcrumb() {
  const context = React.useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
}

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = React.useState<BreadcrumbItem[]>([]);

  const clearBreadcrumbs = React.useCallback(() => {
    setItems([]);
  }, []);

  const value = React.useMemo(
    () => ({
      items,
      setItems,
      clearBreadcrumbs,
    }),
    [items, clearBreadcrumbs]
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function Breadcrumb() {
  const [open, setOpen] = useState(false);
  const isDesktop = !useIsMobile();
  const { items } = useBreadcrumb();

  if (items.length === 0) return null;

  // Show ellipsis if we have more than 2 items (not counting home)
  const shouldShowEllipsis = items.length > 2;
  // Get the last two items
  const lastTwoItems = items.slice(-2);
  // Get all items except the last two for the ellipsis menu
  const hiddenItems = shouldShowEllipsis ? items.slice(0, -2) : [];

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {/* Home item */}
        <BreadcrumbItem>
          <Link href="/dashboard">
            <HomeIcon className="h-4 w-4" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Ellipsis for hidden items */}
        {shouldShowEllipsis && (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {hiddenItems.map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href ? item.href : "#"}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {hiddenItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href ? item.href : "#"}
                          className="py-1 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {/* Last two items */}
        {lastTwoItems.map((item, index) => {
          const isLast = index === lastTwoItems.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {!isLast ? (
                  <BreadcrumbLink
                    asChild
                    className="max-w-20 truncate md:max-w-none"
                  >
                    <Link href={item.href ? item.href : "#"}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}


