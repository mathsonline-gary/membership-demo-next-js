"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/layout/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Settings" }];

export default function SettingsPage() {
  console.log("settings page");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <div>Settings Page</div>
    </>
  );
}
