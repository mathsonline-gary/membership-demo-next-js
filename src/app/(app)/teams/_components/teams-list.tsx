"use client";

import { Team } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { EditTeamDialog } from "./edit-team-dialog";
import { DeleteTeamDialog } from "./delete-team-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TeamsListProps {
  teams: Team[];
}

interface TeamMembersProps {
  members: Team["members"];
}

const TeamMembers = ({ members }: TeamMembersProps) => {
  const formatMembers = (members: Team["members"]) => {
    if (members.length <= 2) {
      return members.map((m) => `${m.first_name} ${m.last_name}`).join(", ");
    }
    const firstTwo = members
      .slice(0, 2)
      .map((m) => `${m.first_name} ${m.last_name}`)
      .join(", ");
    const remaining = members.slice(2);
    return { firstTwo, remaining };
  };

  const formattedMembers = formatMembers(members);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {typeof formattedMembers === "string" ? (
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
  );
};

export function TeamsList({ teams }: TeamsListProps) {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const TeamCard = ({ team }: { team: Team }) => (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{team.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <Badge variant="secondary">{team.members.length} members</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Created {new Date(team.created_at).toLocaleDateString()}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingTeam(team)}>
                Edit team
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeletingTeam(team)}
              >
                Delete team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  // Show cards on mobile and tablet
  if (isMobile || isTablet) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

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
    );
  }

  // Show table on desktop
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>
                  <TeamMembers members={team.members} />
                </TableCell>
                <TableCell>
                  {new Date(team.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingTeam(team)}>
                        Edit team
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeletingTeam(team)}
                      >
                        Delete team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
  );
}
