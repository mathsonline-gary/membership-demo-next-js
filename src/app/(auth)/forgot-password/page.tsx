'use client'

import Link from 'next/link'
import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

import { ForgotPasswordForm } from './forgot-password-form'

export default function Page() {
  useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [isPasswordResetEmailSent, setIsPasswordResetEmailSent] =
    React.useState(false)
  const [email, setEmail] = React.useState('')
  const onPasswordResetEmailSent = (email: string) => {
    setIsPasswordResetEmailSent(true)
    setEmail(email)
  }

  const FormCard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-y-6">
        <ForgotPasswordForm
          onPasswordResetEmailSent={onPasswordResetEmailSent}
        />
        <div className="text-accent-foreground text-center text-sm">
          <Link href="/login">Back to login</Link>
        </div>
      </CardContent>
    </Card>
  )

  const CheckEmailCard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Check your email</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-y-6 text-sm">
        <p>
          Thanks! If <strong>{email}</strong> matches an email address we have
          on file, then we&apos;ve sent you an email containing further
          instructions for resetting your password.
        </p>
        <p>
          If you haven&apos;t received an email in 60 minutes, check your spam,
          or{' '}
          <span
            onClick={() => setIsPasswordResetEmailSent(false)}
            className="cursor-pointer underline"
          >
            try a different email address
          </span>
          .
        </p>
        <div className="text-center text-sm">
          <Link href="/login">Back to login</Link>
        </div>
      </CardContent>
    </Card>
  )

  return !isPasswordResetEmailSent ? <FormCard /> : <CheckEmailCard />
}
