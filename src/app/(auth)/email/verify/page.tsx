"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ValidateEmailPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.email_verified_at) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Implement resend verification email API call
      // const response = await fetch("/api/auth/resend-verification", {
      //   method: "POST",
      // });
      // if (!response.ok) throw new Error("Failed to resend verification email");
    } catch (err) {
      void err;
      setError("Failed to resend verification email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            Please check your email ({user.email}) for a verification link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a verification link to your email address. Please
              click the link to verify your account.
            </p>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              onClick={handleResendVerification}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
