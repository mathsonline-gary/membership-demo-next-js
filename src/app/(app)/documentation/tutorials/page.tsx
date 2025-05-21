import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { MainContainer } from '@/app/(app)/_components/main-container'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Documentation', href: '/documentation' },
  { label: 'Tutorials' },
]

export default function Page() {
  return (
    <MainContainer title="Tutorials" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Tutorials page</div>
    </MainContainer>
  )
}
