"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Teams" }];

export default function TeamsPage() {
  console.log("page: teams");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Teams</h1>
    </>
  );
}
