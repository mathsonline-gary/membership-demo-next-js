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
import { Team } from "@/types/user";

// Temporary mock data
const mockTeams: Team[] = [
  {
    id: 1,
    name: "Engineering Team",
    owner_id: 1,
    owner: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      avatar: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
      role: "teacher",
    },
    members: [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
      {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Design Team",
    owner_id: 2,
    owner: {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      avatar: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
      role: "student",
    },
    members: [
      {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
      {
        id: 3,
        first_name: "Bob",
        last_name: "Johnson",
        email: "bob@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
      {
        id: 4,
        first_name: "Alice",
        last_name: "Johnson",
        email: "alice@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
      {
        id: 5,
        first_name: "Charlie",
        last_name: "Brown",
        email: "charlie@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
      {
        id: 6,
        first_name: "David",
        last_name: "Lee",
        email: "david@example.com",
        avatar: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        role: "student",
      },
    ],
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [{ label: "Teams" }];

export default function TeamsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = mockTeams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <TeamList teams={filteredTeams} />

        <CreateTeamDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </MainContainer>
  );
}
