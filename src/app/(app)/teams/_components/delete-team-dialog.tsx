'use client'

import { toast } from 'sonner'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteTeam } from '@/hooks/use-api-query'
import { Team } from '@/types/user'

interface DeleteTeamDialogProps {
  team: Team
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteTeamDialog({
  team,
  open,
  onOpenChange,
}: DeleteTeamDialogProps) {
  const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam()

  const handleDelete = async () => {
    deleteTeam(team.id, {
      onSuccess: () => {
        toast.success('Team deleted successfully')
        onOpenChange(false)
      },
      onError: () => {
        toast.error('Failed to delete team')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Team</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{team.name}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
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
    </Dialog>
  )
}
