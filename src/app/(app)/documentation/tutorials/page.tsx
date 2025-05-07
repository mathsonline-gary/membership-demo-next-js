"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Documentation", href: "/documentation" },
  { label: "Tutorials" },
];

export default function TutorialsPage() {
  console.log("page: tutorials");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Tutorials</h1>
    </>
  );
}
