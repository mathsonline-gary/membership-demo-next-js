import { CreditCard, Lock, Settings, User } from 'lucide-react'

import { MainContainer } from '@/app/(app)/_components/main-container'
import {
  SectionOverview,
  SectionOverviewItem,
} from '@/app/(app)/_components/section-overview'

const SECTION_OVERVIEW_ITEMS: SectionOverviewItem[] = [
  {
    title: 'General',
    description: 'General settings for the app.',
    href: '#general',
    icon: Settings,
  },
  {
    title: 'Profile',
    description: 'Manage profile.',
    href: '/settings/profile',
    icon: User,
  },
  {
    title: 'Billing',
    description: 'Manage billing.',
    href: '#billing',
    icon: CreditCard,
  },
  {
    title: 'Security',
    description: 'Manage password and device access.',
    href: '/settings/security',
    icon: Lock,
  },
]

export default function Page() {
  return (
    <MainContainer title="Settings">
      <SectionOverview items={SECTION_OVERVIEW_ITEMS} />
    </MainContainer>
  )
}
