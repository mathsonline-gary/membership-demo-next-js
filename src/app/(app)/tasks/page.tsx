import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Tasks" }];

export default function Page() {
  return (
    <MainContainer title="All Tasks" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the All Tasks page</div>
    </MainContainer>
  );
}
