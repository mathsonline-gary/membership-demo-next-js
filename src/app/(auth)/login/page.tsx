"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { useState } from "react";
import { toast } from "sonner";
import { GoogleAuthButton } from "@/app/(auth)/google-auth-button";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);

    // Login
    try {
      const response = await api.auth.login(values);
      api.setAuthToken(response.data.token);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        setSubmitError("An unexpected error occurred. Please try again.");
        return;
      }

      if (error.status === 422) {
        const errors = error.data as { field?: string; message: string }[];
        if (!Array.isArray(errors)) {
          setSubmitError(error.message);
          return;
        }

        errors.forEach((err) => {
          if (err.field) {
            form.setError(err.field as keyof z.infer<typeof formSchema>, {
              type: "server",
              message: err.message,
            });
          } else {
            setSubmitError(err.message);
          }
        });
        return;
      }

      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }

    // Get authenticated user
    try {
      const response = await api.auth.getAuthenticatedUser();
      router.push("/dashboard");
      toast.success("Welcome back, " + response.data.user.first_name + "!");
    } catch (error) {
      console.error("Failed to get authenticated user:", error);
    }
  }

  return (
    <>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Login</h1>
                  <p className="text-muted-foreground text-balance">
                    Login and start your maths journey
                  </p>
                </div>
                {submitError && (
                  <div className="text-destructive text-sm text-center">
                    {submitError}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <GoogleAuthButton disabled={isSubmitting} mode="login" />
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
}
