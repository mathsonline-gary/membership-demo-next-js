"use client";

import * as React from "react";
import { Eclipse } from "lucide-react";
import { useTheme } from "next-themes";
import { META_THEME_COLORS, useMetaColor } from "@/hooks/use-meta-color";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

type ModeSwitcherProps = {
  variant?: "icon" | "switch";
  className?: string;
};

export function ModeSwitcher({ variant = "switch" }: ModeSwitcherProps) {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor } = useMetaColor();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
  }, [resolvedTheme, setTheme, setMetaColor]);

  if (variant === "icon") {
    return <Eclipse className="size-4 cursor-pointer" onClick={toggleTheme} />;
  }

  return (
    <div className="flex items-center justify-between w-full">
      <Label
        htmlFor="dark-mode"
        className="flex items-center gap-2 cursor-pointer w-full"
      >
        <Eclipse className="size-4" />
        <span className="text-sm">Dark Mode</span>
      </Label>

      {mounted ? (
        <Switch
          className="cursor-pointer"
          id="dark-mode"
          checked={resolvedTheme === "dark"}
          onCheckedChange={(checked: boolean) => {
            setTheme(checked ? "dark" : "light");
            setMetaColor(
              checked ? META_THEME_COLORS.dark : META_THEME_COLORS.light
            );
          }}
        />
      ) : (
        <Skeleton className="h-4 w-8 rounded-full" />
      )}
    </div>
  );
}
