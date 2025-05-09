import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Students" }];

export default function Page() {
  return (
    <MainContainer title="Students" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Students page</div>
    </MainContainer>
  );
}
