import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Teams" }];

export default function Page() {
  return (
    <MainContainer title="Teams" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Teams page</div>
    </MainContainer>
  );
}
