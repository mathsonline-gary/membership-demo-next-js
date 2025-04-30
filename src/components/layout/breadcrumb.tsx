"use client";

import * as React from "react";
import Link from "next/link";
import { createContext, useContext, ReactNode, useState } from "react";
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

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbContextType = {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
};

const ITEMS_TO_DISPLAY = 3;

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
}

function Breadcrumb() {
  const [open, setOpen] = useState(false);
  const isDesktop = !useIsMobile();
  const { items } = useBreadcrumb();

  if (items.length === 0) return null;

  // Calculate which items to show and which to hide
  const shouldShowEllipsis = items.length > ITEMS_TO_DISPLAY;
  const visibleItems = shouldShowEllipsis
    ? [items[0], ...items.slice(-2)]
    : items;
  const hiddenItems = shouldShowEllipsis ? items.slice(1, -2) : [];

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const showEllipsis = shouldShowEllipsis && index === 1;

          return (
            <React.Fragment key={index}>
              {showEllipsis && (
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
                          {hiddenItems.map(
                            (item: BreadcrumbItem, index: number) => (
                              <DropdownMenuItem key={index}>
                                <Link href={item.href ? item.href : "#"}>
                                  {item.label}
                                </Link>
                              </DropdownMenuItem>
                            )
                          )}
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

export { BreadcrumbProvider, Breadcrumb, useBreadcrumb };
