"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tools", href: "/tools" },
  { label: "Upload Data" },
];

export default function UploadPage() {
  console.log("page: upload data");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Upload Data</h1>
    </>
  );
}
