"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Admins" }];

export default function AdminsPage() {
  console.log("page: admins");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>All Admins</h1>
    </>
  );
}
