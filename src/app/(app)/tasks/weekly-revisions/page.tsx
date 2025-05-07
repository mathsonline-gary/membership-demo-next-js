import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Weekly Revisions" },
];

export default function Page() {
  return (
    <MainContainer title="Weekly Revisions" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Weekly Revisions page</div>
    </MainContainer>
  );
}
