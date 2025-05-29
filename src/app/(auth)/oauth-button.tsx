'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OAuthButtonProps {
  className?: string
  provider: 'google'
  intent: 'login' | 'register'
}

export function OAuthButton({ provider, intent, className }: OAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn('w-full', className)}
      asChild
    >
      <Link
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth/${provider}/redirect?client=member_dashboard&intent=${intent}`}
        target="_self"
      >
        <Image
          src="/google-icon.svg"
          alt="Continue with Google"
          width={16}
          height={16}
        />
        Google
      </Link>
    </Button>
  )
}
