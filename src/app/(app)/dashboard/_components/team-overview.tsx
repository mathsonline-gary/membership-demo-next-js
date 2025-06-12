import { Users } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function DashboardTeamsOverview() {
  // Fake data
  const totalTeams = 3
  const totalMembers = 18

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          <Users className="text-muted-foreground h-8 w-8" />
          <div>
            <CardTitle>Teams</CardTitle>
            <CardDescription>Overview of your teams</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-8">
        <div>
          <div className="text-2xl font-bold">{totalTeams}</div>
          <div className="text-muted-foreground text-xs">Total Teams</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalMembers}</div>
          <div className="text-muted-foreground text-xs">Total Members</div>
        </div>
      </CardContent>
    </Card>
  )
}
