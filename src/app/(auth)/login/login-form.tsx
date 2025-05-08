"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError } from "@/lib/api/error";
import { toast } from "sonner";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: "",
      remember: false,
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await api.auth.login(values);
      setAccessToken(response.data.token);

      const userResponse = await api.auth.getAuthenticatedUser();
      setUser(userResponse.data.user);

      router.push(searchParams.get("redirect") ?? "/dashboard");
      toast.success(`Welcome, ${userResponse.data.user.first_name}!`);
    } catch (err) {
      let errorMessage: string | null = "Failed to login, please try again.";

      if (err instanceof ApiError && err.isValidationError() && err.errors) {
        errorMessage = null;
        Object.entries(err.errors).forEach(([field, messages]) => {
          form.setError(field as keyof LoginFormValues, {
            type: "server",
            message: messages[0],
          });
        });
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          {error && (
            <div className="rounded-md bg-destructive/10 p-2 text-sm text-center text-destructive">
              {error}
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
                  <Input type="password" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Remember me</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
