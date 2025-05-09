import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="max-w-sm mx-auto">
            <Image
              src="/logo-icon-text.png"
              alt="Logo"
              width={180}
              height={43}
              className="mx-auto dark:invert w-auto mb-18"
              priority
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full md:max-w-xl">
              <div className="flex flex-col gap-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
