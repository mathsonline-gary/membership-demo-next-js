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
import { useCreateTeam } from '@/hooks/use-api-query'
import { ApiError } from '@/lib/api/error'

const teamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
})

type TeamFormValues = z.infer<typeof teamSchema>

export function CreateTeamDialog() {
  const { mutate: createTeam, isPending: isSubmitting } = useCreateTeam()

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: TeamFormValues) => {
    createTeam(data, {
      onSuccess: () => {
        toast.success('Team created successfully')
        form.reset()
      },
      onError: (error) => {
        if (error instanceof ApiError && error.isUnprocessableEntity()) {
          Object.entries(error.getErrors()).forEach(([field, messages]) => {
            form.setError(field as keyof TeamFormValues, {
              message: messages[0],
            })
          })
        } else {
          toast.error('Failed to create team')
        }
      },
    })
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Create a new team to collaborate with others
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader /> : 'Create Team'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
