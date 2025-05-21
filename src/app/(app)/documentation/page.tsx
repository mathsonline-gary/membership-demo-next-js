import { BookOpen, NotebookPen } from 'lucide-react'

import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { MainContainer } from '@/app/(app)/_components/main-container'
import {
  SectionOverview,
  SectionOverviewItem,
} from '@/app/(app)/_components/section-overview'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: 'Documentation' }]

const DOC_PAGES: SectionOverviewItem[] = [
  {
    title: 'Getting Started',
    description:
      'Quick start guide and basic concepts to get you up and running.',
    href: '/documentation/get-started',
    icon: BookOpen,
  },
  {
    title: 'Tutorials',
    description: 'Tutorials for getting started with the app.',
    href: '/documentation/tutorials',
    icon: NotebookPen,
  },
]

export default function Page() {
  return (
    <MainContainer title="Documentation" breadcrumbItems={BREADCRUMB_ITEMS}>
      <SectionOverview items={DOC_PAGES} />
    </MainContainer>
  )
}
