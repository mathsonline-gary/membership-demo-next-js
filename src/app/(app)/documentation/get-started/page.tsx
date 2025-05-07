import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Documentation", href: "/documentation" },
  { label: "Get Started" },
];

export default function Page() {
  return (
    <MainContainer title="Get Started" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Get Started page</div>
    </MainContainer>
  );
}
