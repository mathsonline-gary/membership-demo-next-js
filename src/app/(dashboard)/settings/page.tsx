"use client";

import { useBreadcrumb } from "@/components/layout/breadcrumb";
import { useEffect } from "react";

const BREADCRUMB_ITEMS = [{ label: "Settings" }];

export default function SettingsPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems(BREADCRUMB_ITEMS);
  }, [setItems]);

  return <div>Settings Page</div>;
}
