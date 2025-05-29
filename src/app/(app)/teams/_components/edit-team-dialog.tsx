'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateTeam } from '@/hooks/use-api-query'
import { ApiError } from '@/lib/api/error'
import { Team } from '@/types'

interface EditTeamDialogContentProps {
  team: Team
}

const teamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
})

type TeamFormValues = z.infer<typeof teamSchema>

export function EditTeamDialogContent({ team }: EditTeamDialogContentProps) {
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam()

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name,
    },
  })

  const currentName = form.watch('name')
  const isTeamChanged = currentName !== team.name

  const onSubmit = async (data: TeamFormValues) => {
    updateTeam(
      { id: team.id, name: data.name },
      {
        onSuccess: () => {
          toast.success('Team updated successfully')
        },
        onError: (error) => {
          if (error instanceof ApiError && error.isUnprocessableEntity()) {
            Object.entries(error.getErrors()).forEach(([field, messages]) => {
              form.setError(field as keyof TeamFormValues, {
                message: messages[0],
              })
            })
          } else {
            toast.error('Failed to update team')
          }
        },
      }
    )
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update your team&apos;s information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter team name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdating || !isTeamChanged}>
              {isUpdating ? <Loader /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
