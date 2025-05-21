'use client'

import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ERROR_MESSAGES = {
  failed: 'Authentication failed. Please try again.',
  not_found: 'Account not found. Please register first.',
  already_exists:
    'An account with this email already exists. Please login instead.',
} as const

const NAVIGATION_LINKS = {
  failed: {
    register: { href: '/register', text: 'Back to Sign up' },
    login: { href: '/login', text: 'Back to Login' },
  },
  not_found: {
    register: { href: '/register', text: 'Sign up now' },
    login: { href: '/register', text: 'Sign up now' },
  },
  already_exists: {
    register: { href: '/login', text: 'Login now' },
    login: { href: '/login', text: 'Login now' },
  },
} as const

export default function Page() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as keyof typeof ERROR_MESSAGES
  const intent = searchParams.get('intent') as 'register' | 'login'

  const errorMessage = error ? ERROR_MESSAGES[error] : 'An error occurred.'
  const navigation =
    error && intent
      ? NAVIGATION_LINKS[error][intent]
      : { href: '/login', text: 'Back to Login' }

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <AlertCircle className="text-destructive mx-auto" />
        <span className="sr-only">Error</span>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold">
          Authentication Failed
        </CardTitle>
        <CardDescription className="mt-2">{errorMessage}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={navigation.href}>{navigation.text}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
