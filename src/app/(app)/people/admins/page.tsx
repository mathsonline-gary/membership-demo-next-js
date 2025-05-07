import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Admins" }];

export default function Page() {
  return (
    <MainContainer title="All Admins" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the All Admins page</div>
    </MainContainer>
  );
}
