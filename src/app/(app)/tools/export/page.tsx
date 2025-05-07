"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tools", href: "/tools" },
  { label: "Export Data" },
];

export default function ExportPage() {
  console.log("page: export data");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Export Data</h1>
    </>
  );
}
