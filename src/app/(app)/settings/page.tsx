"use client";

import { useBreadcrumbItems } from "@/hooks/use-breadcrumb-items";

const BREADCRUMB_ITEMS = [{ label: "Settings" }];

export default function SettingsPage() {
  useBreadcrumbItems(BREADCRUMB_ITEMS);

  return <div>Settings Page</div>;
}
