import { Download, Upload } from 'lucide-react'

import { MainContainer } from '@/app/(app)/_components/main-container'
import {
  SectionOverview,
  SectionOverviewItem,
} from '@/app/(app)/_components/section-overview'

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
    <MainContainer title="Tools">
      <SectionOverview items={SECTION_OVERVIEW_ITEMS} />
    </MainContainer>
  )
}
