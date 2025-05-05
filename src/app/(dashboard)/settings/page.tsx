"use client";

import { useBreadcrumb } from "@/components/layout/breadcrumb";
import { useEffect } from "react";

const BREADCRUMB_ITEMS = [{ label: "Settings" }];

export default function SettingsPage() {
  const { setItems, clearBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setItems(BREADCRUMB_ITEMS);

    return () => {
      clearBreadcrumbs();
    };
  }, [setItems, clearBreadcrumbs]);

  return <div>Settings Page</div>;
}
