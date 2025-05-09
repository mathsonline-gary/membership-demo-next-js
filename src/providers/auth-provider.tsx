"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if store is already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
      return;
    }

    // Subscribe to hydration completion
    const unsubHydration = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return () => {
      unsubHydration();
    };
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/login");
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user) {
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
