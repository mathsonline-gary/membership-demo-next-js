"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useSearchParams, useParams } from "next/navigation";
import { ResetPasswordForm } from "./reset-password-form";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = params.token as string;

  console.log(token, email);

  useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Please enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm email={email} token={token} />
      </CardContent>
    </Card>
  );
}
