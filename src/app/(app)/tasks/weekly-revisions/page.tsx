"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Weekly Revisions" },
];

export default function WeeklyRevisionsPage() {
  console.log("page: weekly revisions");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Weekly Revisions</h1>
    </>
  );
}
