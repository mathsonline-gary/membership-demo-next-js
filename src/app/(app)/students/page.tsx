'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { Button } from '@/components/ui/button'

import { MainContainer } from '../_components/main-container'

import { InviteStudentDialog } from './_components/invite-student-dialog'
import { Search } from './_components/search'
import { StudentList } from './_components/student-list'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: 'People' }]

export default function StudentsPage() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  return (
    <MainContainer title="Students" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Search />
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Invite Student
        </Button>
      </div>

      <StudentList />

      <InviteStudentDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
      />
    </MainContainer>
  )
}
