"use client";

import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Settings" }];

export default function SettingsPage() {
  console.log("page: settings");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <div>Settings Page</div>
    </>
  );
}
