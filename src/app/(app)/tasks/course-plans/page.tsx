import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Course Plans" },
];

export default function Page() {
  return (
    <MainContainer title="Course Plans" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Course Plans page</div>
    </MainContainer>
  );
}
