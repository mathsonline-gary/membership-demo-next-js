import { useBreadcrumb, BreadcrumbItem } from "@/components/layout/breadcrumb";
import * as React from "react";

export function useBreadcrumbItems(items: BreadcrumbItem[]) {
  const { setItems, clearBreadcrumbs } = useBreadcrumb();

  React.useEffect(() => {
    setItems(items);

    return () => {
      clearBreadcrumbs();
    };
  }, [setItems, clearBreadcrumbs, items]);
}
