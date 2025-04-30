"use client";

import { useBreadcrumb } from "@/components/layout/breadcrumb";
import { useEffect } from "react";

const DASHBOARD_ITEMS = [{ label: "Dashboard", href: "/dashboard" }];

export default function DashboardPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems(DASHBOARD_ITEMS);
  }, [setItems]);

  return <div>This is the Dashboard</div>;
}
