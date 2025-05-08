"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

interface ErrorState {
  message?: string;
  redirectPath: string;
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<ErrorState | null>(null);
  const { setUser } = useAuthStore();

  async function googleLogin(code: string): Promise<boolean> {
    try {
      await api.auth.googleLogin(code);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ||
            "Failed to login with Google, please try again."
          : "Failed to login with Google, please try again.";

      setError({
        redirectPath: "/login",
        message: errorMessage,
      });
      return false;
    }
  }

  async function googleRegister(code: string): Promise<boolean> {
    try {
      const response = await api.auth.googleRegister(code);
      api.setAuthToken(response.data.token);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ||
            "Failed to register with Google, please try again."
          : "Failed to register with Google, please try again.";

      setError({
        redirectPath: "/register",
        message: errorMessage,
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
      setError({ redirectPath: `/${mode}` });
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
        setUser(userResponse.data.user);

        router.push("/dashboard");
        toast.success(`Welcome, ${userResponse.data.user.first_name}!`);
      } catch (error) {
        void error;
        setError({
          redirectPath: mode === "register" ? "/register" : "/login",
        });
      }
    };

    void handleCallback();
  }, [searchParams, router, setUser]);

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
