"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TeamList } from "./_components/team-list";
import { CreateTeamDialog } from "./_components/create-team-dialog";
import { useState } from "react";
import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";
import { MainContainer } from "@/app/(app)/_components/main-container";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetTeamList } from "@/hooks/use-api-query";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Teams" }];

export default function TeamsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: teams, isFetching } = useGetTeamList();

  const filteredTeams = teams
    ? teams.filter((team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <MainContainer title="Teams" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            New Team
          </Button>
        </div>

        <TeamList teams={filteredTeams} isLoading={isFetching} />

        <CreateTeamDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </MainContainer>
  );
}
