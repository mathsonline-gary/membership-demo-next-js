import { ScrollArea } from '@/components/ui/scroll-area'

import { Breadcrumb, BreadcrumbItem } from './breadcrumb'

interface MainContainerProps {
  children: React.ReactNode
  breadcrumbItems?: BreadcrumbItem[]
  title?: string
  scrollable?: boolean
}

export function MainContainer({
  children,
  breadcrumbItems,
  scrollable = true,
}: MainContainerProps) {
  return scrollable ? (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-y-4">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <div>{children}</div>
      </div>
    </ScrollArea>
  ) : (
    <div className="flex min-h-0 flex-1 flex-col gap-y-4">
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
