'use client'

import { MainContainer } from '@/app/(app)/_components/main-container'

import Readme from './readme.mdx'

const BREADCRUMB_ITEMS = [
  {
    label: 'Documentation',
    href: '/documentation',
  },
]

export default function ReadMePage() {
  return (
    <MainContainer title="README" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div className="prose dark:prose-invert max-w-none">
        <Readme />
      </div>
    </MainContainer>
  )
}
