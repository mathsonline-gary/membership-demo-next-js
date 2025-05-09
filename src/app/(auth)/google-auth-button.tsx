"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/lib/api";
import { toast } from "sonner";
import React from "react";
import { LoaderCircle } from "lucide-react";

interface GoogleAuthButtonProps {
  className?: string;
  mode: "login" | "register";
}

export function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await api.auth.getGoogleRedirectUrl({ mode });
      window.location.href = response.data.url;
    } catch (error) {
      void error;
      setIsLoading(false);
      toast.error("Failed to continue with Google. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Image
          src="/google-icon.svg"
          alt="Continue with Google"
          width={16}
          height={16}
        />
      )}
      {isLoading || "Google"}
    </Button>
  );
}
