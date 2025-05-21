import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center justify-center gap-[32px]">
        <Image
          className="mx-auto dark:invert"
          src="/logo-icon-text.png"
          alt="Logo"
          width={360}
          height={86}
          priority
        />
        <Button asChild className="w-full">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/register">Sign up</Link>
        </Button>
      </main>
    </div>
  )
}
