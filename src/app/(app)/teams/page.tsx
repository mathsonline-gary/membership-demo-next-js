'use client'

import { Plus } from 'lucide-react'

import { MainContainer } from '@/app/(app)/_components/main-container'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { CreateTeamDialog } from './_components/create-team-dialog'
import { SearchBar } from './_components/search-bar'
import { TeamList } from './_components/team-list'

export default function TeamsPage() {
  return (
    <MainContainer title="Teams">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <SearchBar />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                New Team
              </Button>
            </DialogTrigger>
            <CreateTeamDialog />
          </Dialog>
        </div>
        <TeamList />
      </div>
    </MainContainer>
  )
}
