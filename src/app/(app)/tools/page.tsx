"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Tools" }];

export default function ToolsPage() {
  console.log("page: tools");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Tools</h1>
    </>
  );
}
