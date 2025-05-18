"use client";

import { Button } from "@/components/ui/button";
import { InviteStudentDialog } from "./_components/invite-student-dialog";
import { Plus } from "lucide-react";
import { StudentList } from "./_components/student-list";
import { useState } from "react";
import { Search } from "./_components/search";
import { MainContainer } from "../_components/main-container";
import { BreadcrumbItem } from "@/app/(app)/_components/breadcrumb";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  {
    label: "Students",
    href: "/students",
  },
];

export default function StudentsPage() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  return (
    <MainContainer title="Students" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div className="mb-6 flex items-center gap-4 justify-between">
        <Search />
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Invite Student
        </Button>
      </div>

      <StudentList />

      <InviteStudentDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
      />
    </MainContainer>
  );
}
