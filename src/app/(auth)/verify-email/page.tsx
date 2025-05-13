"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Please check your email for a verification link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We&apos;ve sent a verification link to your email address. Please
            click the link to verify your account.
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </CardContent>
      <CardFooter className="grid gap-2">
        <Button
          onClick={handleResendVerification}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Resend verification email"}
        </Button>
        <div className="text-center">
          <span
            onClick={handleLogout}
            className="text-sm underline underline-offset-4 cursor-pointer"
          >
            Logout
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
