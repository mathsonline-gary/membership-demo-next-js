import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <Image
          className="dark:invert mx-auto"
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
  );
}
