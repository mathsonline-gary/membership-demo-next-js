import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { MainContainer } from '@/app/(app)/_components/main-container'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Tools', href: '/tools' },
  { label: 'Export Data' },
]

export default function Page() {
  return (
    <MainContainer title="Export Data" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Export Data page</div>
    </MainContainer>
  )
}
