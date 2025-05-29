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
    <>
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      <section className="relative flex flex-1 flex-col space-y-6 px-4 py-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {children}
      </section>
    </>
  )
}
