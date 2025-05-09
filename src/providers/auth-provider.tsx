"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useAuthStore.persist.onHydrate(() =>
      setIsHydrated(false)
    );
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() =>
      setIsHydrated(true)
    );

    setIsHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
