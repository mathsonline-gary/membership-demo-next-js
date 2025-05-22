'use client'

import { toast } from 'sonner'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteTeam } from '@/hooks/use-api-query'
import { Team } from '@/types/user'

interface DeleteTeamDialogContentProps {
  team: Team
}

export function DeleteTeamDialogContent({
  team,
}: DeleteTeamDialogContentProps) {
  const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam()

  const handleDelete = async () => {
    deleteTeam(team.id, {
      onSuccess: () => {
        toast.success('Team deleted successfully')
      },
      onError: () => {
        toast.error('Failed to delete team')
      },
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Team</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <strong>{team.name}</strong>? This
          action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <Loader /> : 'Delete Team'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
