"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
interface ErrorState {
  message?: string;
  redirectPath: string;
}

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<ErrorState | null>(null);

  async function googleLogin(code: string): Promise<boolean> {
    try {
      const response = await api.auth.googleLogin(code);
      api.setAuthToken(response.data.token);
      return true;
    } catch (error) {
      setError({
        redirectPath: "/login",
        message: error instanceof ApiError ? error.message : undefined,
      });
      return false;
    }
  }

  async function googleRegister(code: string): Promise<boolean> {
    try {
      const response = await api.auth.googleRegister(code);
      api.setAuthToken(response.data.token);
      return true;
    } catch (error: unknown) {
      setError({
        redirectPath: "/register",
        message: error instanceof ApiError ? error.message : undefined,
      });
      return false;
    }
  }

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state") ?? "";
    const params = JSON.parse(atob(state));

    if (!code || !params.mode || !params.brand_id) {
      console.error("Failed to authenticate with Google: invalid parameters", {
        ...params,
        code,
      });
      setError({ redirectPath: "/login" });
      return;
    }

    const mode = params.mode;
    const brandId = Number(params.brand_id);

    if (mode !== "login" && mode !== "register") {
      console.error("Failed to authenticate with Google: invalid mode", {
        ...params,
        code,
      });
      setError({ redirectPath: "/login" });
      return;
    }

    if (brandId !== Number(process.env.NEXT_PUBLIC_APP_BRAND_ID)) {
      console.error("Failed to authenticate with Google: invalid brand ID", {
        ...params,
        code,
      });
      setError({ redirectPath: "/login" });
      return;
    }

    const handleCallback = async () => {
      let success = false;
      switch (mode) {
        case "login":
          success = await googleLogin(code);
          break;
        case "register":
          success = await googleRegister(code);
          break;
      }

      if (!success) return;

      try {
        const userResponse = await api.auth.getAuthenticatedUser();
        router.push("/dashboard");
        toast.success(`Welcome, ${userResponse.data.user.first_name}!`);
      } catch (error) {
        console.error("Failed to get authenticated user:", error);
        setError({
          redirectPath: mode === "register" ? "/register" : "/login",
        });
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <Card className="w-full text-center">
        <CardHeader>
          <AlertCircle className="mx-auto text-destructive" />
          <span className="sr-only">Error</span>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">Authentication Failed</h1>
          <p className="text-muted-foreground">
            {error.message ??
              "Failed to authenticate with Google. Please try again."}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => router.push(error.redirectPath)}
          >
            Back to {error.redirectPath === "/register" ? "sign up" : "login"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <LoaderCircle className="mx-auto animate-spin" />
        <span className="sr-only">Authenticating...</span>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl font-bold">Authenticating...</h1>

        <p className="text-muted-foreground">
          Please wait while we verify your account.
        </p>
      </CardContent>
    </Card>
  );
}
