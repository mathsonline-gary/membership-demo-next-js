import { MainContainer } from '@/app/(app)/_components/main-container'

import { DashboardCoursesOverview } from './_components/course-overview'
import { DashboardLessonsOverview } from './_components/lesson-overview'
import { DashboardTeamsOverview } from './_components/team-overview'

export default function Page() {
  return (
    <MainContainer title="Dashboard">
      <div className="grid gap-6">
        <DashboardTeamsOverview />
        <DashboardCoursesOverview />
        <DashboardLessonsOverview />
      </div>
    </MainContainer>
  )
}
