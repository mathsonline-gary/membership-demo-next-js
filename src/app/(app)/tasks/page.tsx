"use client";
import { Breadcrumb, BreadcrumbItem } from "@/components/layout/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "All Tasks" }];

export default function TasksPage() {
  console.log("tasks page");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>All Tasks</h1>
    </>
  );
}
