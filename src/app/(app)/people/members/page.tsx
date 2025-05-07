import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Members" }];

export default function Page() {
  return (
    <MainContainer title="Members" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Members page</div>
    </MainContainer>
  );
}
