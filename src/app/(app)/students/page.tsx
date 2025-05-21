import { Plus } from 'lucide-react'

import { BreadcrumbItem } from '@/app/(app)/_components/breadcrumb'
import { MainContainer } from '@/app/(app)/_components/main-container'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { InviteStudentDialog } from './_components/invite-student-dialog'
import { SearchBar } from './_components/search-bar'
import { StudentList } from './_components/student-list'

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: 'People' }]

export default function StudentsPage() {
  return (
    <MainContainer title="Students" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBar />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Invite Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <InviteStudentDialog />
          </DialogContent>
        </Dialog>
      </div>

      <StudentList />
    </MainContainer>
  )
}
