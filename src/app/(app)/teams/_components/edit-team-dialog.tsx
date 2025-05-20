"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/loader";
import { Team } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useUpdateTeam } from "@/hooks/use-api-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApiError } from "@/lib/api/error";

interface EditTeamDialogProps {
  team: Team;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const teamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters"),
});

type TeamFormValues = z.infer<typeof teamSchema>;

export function EditTeamDialog({
  team,
  open,
  onOpenChange,
}: EditTeamDialogProps) {
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam();

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name,
    },
  });

  const currentName = form.watch("name");
  const isTeamChanged = currentName !== team.name;

  const onSubmit = async (data: TeamFormValues) => {
    updateTeam(
      { id: team.id, name: data.name },
      {
        onSuccess: () => {
          toast.success("Team updated successfully");
          onOpenChange(false);
        },
        onError: (error) => {
          if (error instanceof ApiError && error.isUnprocessableEntity()) {
            Object.entries(error.getErrors()).forEach(([field, messages]) => {
              form.setError(field as keyof TeamFormValues, {
                message: messages[0],
              });
            });
          } else {
            toast.error("Failed to update team");
          }
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating || !isTeamChanged}>
                {isUpdating ? <Loader /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
