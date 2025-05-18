"use client";

import { User } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/loader";
import { useSearchParams } from "next/navigation";

async function fetchStudents(searchQuery: string): Promise<User[]> {
  console.log(searchQuery);

  // TODO: Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      avatar: null,
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
      role: "student",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      avatar: null,
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
      role: "student",
    },
  ];
}

const StudentCards = ({ students }: { students: User[] }) => (
  <div className="grid gap-4">
    {students.map((student) => (
      <Card key={student.id}>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={student.avatar || undefined} />
              <AvatarFallback>
                {student.first_name[0]}
                {student.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">
                {student.first_name} {student.last_name}
              </h3>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const StudentTable = ({ students }: { students: User[] }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.avatar || undefined} />
                  <AvatarFallback>
                    {student.first_name[0]}
                    {student.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {student.first_name} {student.last_name}
                </span>
              </div>
            </TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>
              {new Date(student.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export function StudentList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", searchQuery],
    queryFn: () => fetchStudents(searchQuery),
  });

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
        Failed to load students. Please try again.
      </div>
    );
  }

  if (!students?.length) {
    return (
      <div className="rounded-lg border p-4 text-center text-muted-foreground">
        No students found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isMobile || isTablet ? (
        <StudentCards students={students} />
      ) : (
        <StudentTable students={students} />
      )}
    </div>
  );
}
