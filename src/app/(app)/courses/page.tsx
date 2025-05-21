import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { MainContainer } from '@/app/(app)/_components/main-container'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: 'Courses' }]

export default function Page() {
  return (
    <MainContainer title="Courses" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div>This is the Courses page</div>
    </MainContainer>
  )
}
