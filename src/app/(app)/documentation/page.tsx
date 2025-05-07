"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Documentation" }];

export default function DocumentationPage() {
  console.log("page: documentation");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Documentation</h1>
    </>
  );
}
