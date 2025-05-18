"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader } from "@/components/loader";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

export function ForgotPasswordForm({
  onPasswordResetEmailSent,
}: {
  onPasswordResetEmailSent: (email: string) => void;
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { forgotPassword } = useAuth();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      setIsSubmitting(true);
      await forgotPassword({
        email: values.email,
        setError: (message, errors) => {
          setError(message);
          Object.entries(errors).forEach(([field, messages]) => {
            form.setError(field as keyof ForgotPasswordFormValues, {
              type: "server",
              message: messages[0],
            });
          });
        },
      });
      onPasswordResetEmailSent(values.email);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : "Send reset link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
