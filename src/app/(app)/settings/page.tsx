import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";
import {
  SectionOverview,
  SectionOverviewItem,
} from "@/app/(app)/_components/section-overview";
import { Settings, User, CreditCard } from "lucide-react";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Settings" }];

const SECTION_OVERVIEW_ITEMS: SectionOverviewItem[] = [
  {
    title: "General",
    description: "General settings for the app.",
    href: "#general",
    icon: Settings,
  },
  {
    title: "Profile",
    description: "Manage profile.",
    href: "#profile",
    icon: User,
  },
  {
    title: "Billing",
    description: "Manage billing.",
    href: "#billing",
    icon: CreditCard,
  },
];

export default function Page() {
  return (
    <MainContainer title="Settings" breadcrumbItems={BREADCRUMB_ITEMS}>
      <SectionOverview items={SECTION_OVERVIEW_ITEMS} />
    </MainContainer>
  );
}
