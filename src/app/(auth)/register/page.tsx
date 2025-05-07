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
import { useRouter } from "next/navigation";
import * as React from "react";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/client";
import { toast } from "sonner";
import { GoogleAuthButton } from "../google-auth-button";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    first_name: z.string().min(1, {
      message: "First name is required.",
    }),
    last_name: z.string().min(1, {
      message: "Last name is required.",
    }),
    username: z.string().min(1, {
      message: "Username is required.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.auth.register({
        ...values,
        type: "customer",
        brand_id: Number(process.env.NEXT_PUBLIC_APP_BRAND_ID),
      });
      api.setAuthToken(response.data.token);
      toast.success("Account created successfully!");
      router.push("/dashboard");
      return;
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
  }

  return (
    <>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Sign up</h1>
                  <p className="text-muted-foreground text-balance">
                    Create an account to start your maths journey
                  </p>
                </div>
                {submitError && (
                  <div className="text-destructive text-sm text-center">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
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
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john_doe"
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
                      <FormLabel>Password</FormLabel>
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
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <GoogleAuthButton disabled={isSubmitting} mode="register" />
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
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
