'use client'

import { useState } from 'react'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export default function Page() {
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isResent, setIsResent] = useState<boolean>(false)
  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
  })

  const handleResendVerification = async () => {
    try {
      setIsResending(true)
      setError(null)
      await resendEmailVerification({ setError })
      setIsResent(true)
    } catch (err) {
      void err
      setError('Failed to resend verification email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Please check your email for a verification link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isResent ? (
            <p className="text-muted-foreground">
              A new verification link has been sent to the email address you
              provided during registration.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Thanks for signing up! Before getting started, could you verify
              your email address by clicking on the link we just emailed to you?
              If you didn&apos;t receive the email, we will gladly send you
              another.
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </CardContent>
      <CardFooter className="grid gap-2">
        <Button
          onClick={handleResendVerification}
          disabled={isResending}
          className="w-full"
        >
          {isResending ? <Loader /> : 'Resend verification email'}
        </Button>
        <div className="text-center">
          <span
            onClick={handleLogout}
            className="cursor-pointer text-sm underline underline-offset-4"
          >
            Logout
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
