"use client";
import { Breadcrumb, BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Documentation", href: "/documentation" },
  { label: "Introduction" },
];

export default function IntroductionPage() {
  console.log("page: introduction");
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <h1>Introduction</h1>
    </>
  );
}
