"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/lib/api";
import { toast } from "sonner";
import React from "react";
import { LoaderCircle } from "lucide-react";

interface GoogleAuthButtonProps {
  disabled?: boolean;
  className?: string;
  mode: "login" | "register";
}

export function GoogleAuthButton({ disabled, mode }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await api.auth.getGoogleRedirectUrl({ mode });
      window.location.href = response.data.url;
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to continue with Google:", error);
      toast.error("Failed to continue with Google. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={disabled || isLoading}
      onClick={handleGoogleLogin}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Image
          src="/google.svg"
          alt="Continue with Google"
          width={16}
          height={16}
        />
      )}
      {isLoading || "Google"}
    </Button>
  );
}
