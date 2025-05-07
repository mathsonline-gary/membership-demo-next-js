"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Members" }];

export default function MembersPage() {
  console.log("page: members");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Members</h1>
    </>
  );
}
