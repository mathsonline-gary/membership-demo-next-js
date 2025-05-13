"use client";

import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth({ middleware: "auth" });

  if (!user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Image
          src="/logo-icon-text.png"
          alt="Loading..."
          width={180}
          height={43}
          className="mx-auto dark:invert w-auto animate-pulse"
          priority
        />
      </div>
    );
  }

  return <>{children}</>;
}
