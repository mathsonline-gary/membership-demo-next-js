import { Download, Upload } from 'lucide-react'

import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { MainContainer } from '@/app/(app)/_components/main-container'
import {
  SectionOverview,
  SectionOverviewItem,
} from '@/app/(app)/_components/section-overview'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: 'Tools' }]

const SECTION_OVERVIEW_ITEMS: SectionOverviewItem[] = [
  {
    title: 'Export Data',
    description: 'Export data from the app.',
    href: '/tools/export',
    icon: Download,
  },
  {
    title: 'Upload Data',
    description: 'Upload data to the app.',
    href: '/tools/upload',
    icon: Upload,
  },
]

export default function Page() {
  return (
    <MainContainer title="Tools" breadcrumbItems={BREADCRUMB_ITEMS}>
      <SectionOverview items={SECTION_OVERVIEW_ITEMS} />
    </MainContainer>
  )
}
