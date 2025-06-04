'use client'

import { useSearchParams } from 'next/navigation'

import { MainContainer } from '@/app/(app)/_components/main-container'

import { CreateTeamButton } from './_components/create-team-button'
import { SearchBar } from './_components/search-bar'
import { TeamList } from './_components/team-list'

export default function TeamsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  return (
    <MainContainer title="Teams">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <SearchBar />
          </div>
          <CreateTeamButton />
        </div>
        <TeamList query={query} />
      </div>
    </MainContainer>
  )
}
