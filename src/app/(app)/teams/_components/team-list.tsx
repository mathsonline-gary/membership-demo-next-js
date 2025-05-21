'use client'

import { MoreHorizontal, Users } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile'
import { Team } from '@/types/user'

import { DeleteTeamDialog } from './delete-team-dialog'
import { EditTeamDialog } from './edit-team-dialog'

type TeamListProps = {
  teams: Team[]
  isLoading: boolean
}

interface TeamMembersProps {
  members: Team['members']
}

interface TeamActionsProps {
  team: Team
  onEdit: (team: Team) => void
  onDelete: (team: Team) => void
}

const TeamTableCellMembers = ({ members }: TeamMembersProps) => {
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

const TeamActions = ({ team, onEdit, onDelete }: TeamActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-full">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => onEdit(team)}>
        Edit team
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-destructive"
        onClick={() => onDelete(team)}
      >
        Delete team
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

const TeamCards = ({
  teams,
  onEdit,
  onDelete,
}: {
  teams: Team[]
  onEdit: (team: Team) => void
  onDelete: (team: Team) => void
}) => (
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
              <TeamActions team={team} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </CardContent>
        </Card>
      ))
    )}
  </div>
)

const TeamTable = ({
  teams,
  onEdit,
  onDelete,
}: {
  teams: Team[]
  onEdit: (team: Team) => void
  onDelete: (team: Team) => void
}) => (
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
                <TeamActions team={team} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
)

const TeamTableSkeleton = () => (
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

const TeamCardSkeleton = () => (
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

export function TeamList({ teams, isLoading }: TeamListProps) {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const handleEdit = (team: Team) => setEditingTeam(team)
  const handleDelete = (team: Team) => setDeletingTeam(team)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {isMobile || isTablet ? <TeamCardSkeleton /> : <TeamTableSkeleton />}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isMobile || isTablet ? (
        <TeamCards teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <TeamTable teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {editingTeam && (
        <EditTeamDialog
          team={editingTeam}
          open={!!editingTeam}
          onOpenChange={(open: boolean) => !open && setEditingTeam(null)}
        />
      )}

      {deletingTeam && (
        <DeleteTeamDialog
          team={deletingTeam}
          open={!!deletingTeam}
          onOpenChange={(open: boolean) => !open && setDeletingTeam(null)}
        />
      )}
    </div>
  )
}
