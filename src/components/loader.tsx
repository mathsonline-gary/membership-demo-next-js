import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export function Loader({ className }: { className?: string }) {
  return <LoaderCircle className={cn('h-4 w-4 animate-spin', className)} />
}

export function PageLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-background flex h-full items-center justify-center',
        className
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <Image
            src="/logo-icon-text.png"
            alt="Logo"
            width={180}
            height={43}
            priority
            className="animate-pulse dark:invert"
          />
        </div>
      </div>
    </div>
  )
}
