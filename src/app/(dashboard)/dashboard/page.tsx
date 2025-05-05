"use client";

import { useBreadcrumb } from "@/components/layout/breadcrumb";
import { useEffect } from "react";

const BREADCRUMB_ITEMS = [{ label: "Dashboard" }];

export default function DashboardPage() {
  const { setItems, clearBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setItems(BREADCRUMB_ITEMS);

    return () => {
      clearBreadcrumbs();
    };
  }, [setItems, clearBreadcrumbs]);

  return <div>This is the Dashboard</div>;
}
