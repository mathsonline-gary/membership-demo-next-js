'use client'

import { PageLoader } from '@/components/loader'
import { useAuth } from '@/hooks/use-auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return <PageLoader className="h-screen" />
  }

  return <>{children}</>
}
