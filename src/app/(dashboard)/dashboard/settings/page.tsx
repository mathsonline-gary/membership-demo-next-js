"use client";

import { useBreadcrumb } from "@/components/layout/breadcrumb";
import { useEffect } from "react";

export default function SettingsPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/dashboard" },
      { label: "Dashboard1", href: "/dashboard" },
      { label: "Dashboard2", href: "/dashboard" },
      { label: "Dashboard3", href: "/dashboard" },
      { label: "Dashboard4", href: "/dashboard" },
      { label: "Dashboard5", href: "/dashboard" },
      { label: "Settings" },
    ]);
  }, [setItems]);

  return <div>Settings Page</div>;
}
