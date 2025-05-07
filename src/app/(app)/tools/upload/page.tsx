import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Tools", href: "/tools" },
  { label: "Upload Data" },
];

export default function Page() {
  return (
    <MainContainer title="Upload Data" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Upload Data page</div>
    </MainContainer>
  );
}
