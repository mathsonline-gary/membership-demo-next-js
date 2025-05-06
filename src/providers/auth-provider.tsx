"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoaderCircle } from "lucide-react";

type AuthProviderProps = {
  children: React.ReactNode;
  middleware?: "auth" | "guest";
};

export function AuthProvider({ children, middleware }: AuthProviderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, token, user, getAuthenticatedUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handle hydration and initial auth state
  useEffect(() => {
    const persistState = useAuthStore.persist;

    const handleInitialAuthCheck = () => {
      if (isAuthenticated && token && !user) {
        return getAuthenticatedUser().finally(() => setIsLoading(false));
      }
      setIsLoading(false);
    };

    // Subscribe to hydration
    const unsub = persistState.onFinishHydration(() => {
      handleInitialAuthCheck();
    });

    // If store is already hydrated, check auth state immediately
    if (persistState.hasHydrated()) {
      handleInitialAuthCheck();
    }

    return () => {
      unsub();
    };
  }, [isAuthenticated, token, user, getAuthenticatedUser]);

  // Handle route protection
  useEffect(() => {
    if (isLoading || !middleware) return;

    if (middleware === "guest") {
      // If user is authenticated and tries to access guest routes (like /login)
      if (isAuthenticated) {
        setIsRedirecting(true);
        const redirectTo = searchParams.get("redirect") || "/dashboard";
        router.replace(redirectTo);
      }
    } else if (middleware === "auth") {
      // If user is not authenticated and tries to access protected routes
      if (!isAuthenticated) {
        setIsRedirecting(true);
        const returnTo = encodeURIComponent(window.location.pathname);
        router.replace(`/login?redirect=${returnTo}`);
      }
    }
  }, [isLoading, middleware, isAuthenticated, router, searchParams]);

  return (
    <>
      {isLoading || isRedirecting ? (
        <div className="flex h-screen w-full items-center justify-center">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        children
      )}
    </>
  );
}
