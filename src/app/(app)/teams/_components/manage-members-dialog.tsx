import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Loader } from '@/components/loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
import {
  useDeleteTeamMember,
  useInviteTeamMember,
} from '@/hooks/use-api-query/teams'
import { ApiError } from '@/lib/api/error'
import type { Team, TeamMember } from '@/types'

interface ManageMembersDialogContentProps {
  team: Team
}

const inviteSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})
type InviteForm = z.infer<typeof inviteSchema>

export function ManageMembersDialogContent({
  team,
}: ManageMembersDialogContentProps) {
  const [members, setMembers] = useState<TeamMember[]>(team.members)
  const [removingId, setRemovingId] = useState<number | null>(null)

  const form = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  })

  // Invite member mutation
  const { mutate: inviteMember, isPending: isInviting } = useInviteTeamMember()

  // Remove member mutation
  const { mutate: deleteMember, isPending: isDeleting } = useDeleteTeamMember()

  const handleInvite = (data: InviteForm) => {
    inviteMember(
      { teamId: team.id, email: data.email },
      {
        onSuccess: () => {
          form.reset()
          toast.success('An invitation has been sent to the email address.')
        },
        onError: (error) => {
          if (error instanceof ApiError && error.isUnprocessableEntity()) {
            form.setError('email', { message: error.getErrors().email[0] })
          } else {
            toast.error('Failed to invite member to the team.')
          }
        },
      }
    )
  }

  const handleRemove = (id: number) => {
    setRemovingId(id)
    deleteMember(
      { teamId: team.id, memberId: id },
      {
        onSuccess: () => {
          setMembers(members.filter((m) => m.id !== id))
          setRemovingId(null)
          toast.success('Member has been removed from the team.')
        },
        onError: () => {
          setRemovingId(null)
          toast.error('Failed to remove member from the team.')
        },
      }
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Members</DialogTitle>
        <DialogDescription>
          Manage members of <span className="font-semibold">{team.name}</span>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleInvite)}
            className="flex gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      className="w-full rounded border px-2 py-1 text-sm"
                      placeholder="Email"
                      disabled={isInviting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isInviting || !form.formState.isValid}
            >
              {isInviting ? <Loader /> : 'Invite'}
            </Button>
          </form>
        </Form>
        <div>
          <ul className="space-y-4">
            {members.length === 0 ? (
              <li className="text-muted-foreground text-sm">No members yet.</li>
            ) : (
              members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={member.avatar ?? ''} />
                      <AvatarFallback>
                        {member.first_name.charAt(0)}
                        {member.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {member.first_name} {member.last_name}
                        </span>
                        <Badge
                          variant={
                            member.status === 'pending'
                              ? 'secondary'
                              : 'default'
                          }
                        >
                          {member.status}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isDeleting && removingId === member.id}
                    onClick={() => handleRemove(member.id)}
                    aria-label="Remove member"
                  >
                    {isDeleting && removingId === member.id ? (
                      <Loader />
                    ) : (
                      <Trash2 className="text-destructive h-4 w-4" />
                    )}
                  </Button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
