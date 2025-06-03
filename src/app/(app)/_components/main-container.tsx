import { Breadcrumb, BreadcrumbItem } from './breadcrumb'

export function MainContainer({
  children,
  breadcrumbItems,
  title,
}: {
  children: React.ReactNode
  breadcrumbItems?: BreadcrumbItem[]
  title: string
}) {
  console.log('page: ', title)

  return (
    <div className="flex h-full min-h-0 flex-col gap-y-4">
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      <div className="relative flex flex-1 flex-col space-y-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="h-full min-h-0 flex-1 shrink">{children}</div>
      </div>
    </div>
  )
}
