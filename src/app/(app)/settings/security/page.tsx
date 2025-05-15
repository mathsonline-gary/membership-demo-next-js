import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";
import { Shield, Smartphone, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordTab } from "./update-password-tab";
import { DevicesTab } from "./devices-tab";
import { TwoFactorAuthenticationTab } from "./two-factor-authentication-tab";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Settings", href: "/settings" },
  { label: "Security" },
];

const TAB_ITEMS = [
  {
    value: "password",
    label: "Password",
    icon: Key,
    component: PasswordTab,
  },
  {
    value: "devices",
    label: "Devices",
    icon: Smartphone,
    component: DevicesTab,
  },
  {
    value: "two-factor-authentication",
    label: "Two-Factor Authentication",
    icon: Shield,
    component: TwoFactorAuthenticationTab,
  },
] as const;

export default function SecurityPage() {
  return (
    <MainContainer title="Security" breadcrumbItems={BREADCRUMB_ITEMS}>
      <Tabs defaultValue="password" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
          {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="w-full flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_ITEMS.map(({ value, component: Component }) => (
          <TabsContent key={value} value={value}>
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </MainContainer>
  );
}
