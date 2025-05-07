"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Course Plans" },
];

export default function CoursePlansPage() {
  console.log("page: course plans");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Course Plans</h1>
    </>
  );
}
