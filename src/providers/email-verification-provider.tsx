"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export function EmailVerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && !user.email_verified_at) {
      router.replace("/email/verify");
    }
  }, [user, router]);

  if (!user || !user.email_verified_at) {
    return null;
  }

  return <>{children}</>;
}
