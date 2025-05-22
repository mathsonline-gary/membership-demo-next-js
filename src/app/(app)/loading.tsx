import Image from 'next/image'

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
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
