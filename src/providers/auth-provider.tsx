'use client'

import Image from 'next/image'

import { useAuth } from '@/hooks/use-auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Image
          src="/logo-icon-text.png"
          alt="Loading..."
          width={180}
          height={43}
          className="mx-auto w-auto animate-pulse dark:invert"
          priority
        />
      </div>
    )
  }

  return <>{children}</>
}
