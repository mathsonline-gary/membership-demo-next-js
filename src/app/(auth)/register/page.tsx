"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "./register-form";
import { GoogleAuthButton } from "../google-auth-button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="grid gap-y-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Sign up</h1>
            <p className="text-muted-foreground text-balance">
              Create an account to start your maths journey
            </p>
          </div>

          <RegisterForm />

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <GoogleAuthButton mode="register" />
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
}
