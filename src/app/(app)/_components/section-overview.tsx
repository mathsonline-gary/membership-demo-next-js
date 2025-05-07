import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export type SectionOverviewItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function SectionOverview({ items }: { items: SectionOverviewItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((page) => (
        <Link key={page.href} href={page.href} className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <page.icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{page.title}</CardTitle>
              </div>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
