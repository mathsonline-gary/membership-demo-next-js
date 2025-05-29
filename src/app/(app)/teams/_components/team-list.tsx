'use client'

import { MoreHorizontal, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useGetTeamList } from '@/hooks/use-api-query'
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile'
import { Team } from '@/types'

import { DeleteTeamDialogContent } from './delete-team-dialog'
import { EditTeamDialogContent } from './edit-team-dialog'
import { ManageMembersDialogContent } from './manage-members-dialog'

export function TeamList() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  const { data: teams, isLoading, isError } = useGetTeamList(query)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {isMobile || isTablet ? <TeamCardSkeleton /> : <TeamTableSkeleton />}
      </div>
    )
  }

  if (isError || !teams) {
    return <div className="text-destructive">Failed to load teams.</div>
  }

  return (
    <div className="space-y-4">
      {isMobile || isTablet ? (
        <TeamCards teams={teams} />
      ) : (
        <TeamTable teams={teams} />
      )}
    </div>
  )
}
interface TeamMembersProps {
  members: Team['members']
}

function TeamTableCellMembers({ members }: TeamMembersProps) {
  const formatMembers = (members: Team['members']) => {
    if (members.length <= 2) {
      return members.map((m) => `${m.first_name} ${m.last_name}`).join(', ')
    }
    const firstTwo = members
      .slice(0, 2)
      .map((m) => `${m.first_name} ${m.last_name}`)
      .join(', ')
    const remaining = members.slice(2)
    return { firstTwo, remaining }
  }

  const formattedMembers = formatMembers(members)

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm">
        {typeof formattedMembers === 'string' ? (
          formattedMembers
        ) : (
          <>
            {formattedMembers.firstTwo}
            {members.length > 2 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="ml-2">
                      +{members.length - 2} more
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {formattedMembers.remaining.map((member) => (
                        <p key={member.id} className="text-sm">
                          {member.first_name} {member.last_name}
                        </p>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
      </span>
    </div>
  )
}

interface TeamActionsProps {
  team: Team
}

function TeamActions({ team }: TeamActionsProps) {
  const [dialog, setDialog] = useState<null | 'edit' | 'members' | 'delete'>(
    null
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialog('edit')}>
            Edit team
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialog('members')}>
            Manage members
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDialog('delete')}
          >
            Delete team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={dialog === 'edit'}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <EditTeamDialogContent team={team} />
      </Dialog>
      <Dialog
        open={dialog === 'members'}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <ManageMembersDialogContent team={team} />
      </Dialog>
      <Dialog
        open={dialog === 'delete'}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <DeleteTeamDialogContent team={team} />
      </Dialog>
    </>
  )
}

function TeamCards({ teams }: { teams: Team[] }) {
  return (
    <div className="grid gap-4">
      {teams.length === 0 ? (
        <div className="text-center">No teams found</div>
      ) : (
        teams.map((team) => (
          <Card key={team.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{team.name}</h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <Badge variant="secondary">
                      {team.members.length} members
                    </Badge>
                  </div>
                </div>
                <TeamActions team={team} />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

function TeamTable({ teams }: { teams: Team[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No teams found
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>
                  <TeamTableCellMembers members={team.members} />
                </TableCell>
                <TableCell>
                  {new Date(team.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <TeamActions team={team} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function TeamTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TeamCardSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
