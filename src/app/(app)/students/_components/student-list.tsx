'use client'

import { useSearchParams } from 'next/navigation'

import { Loader } from '@/components/loader'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetStudentList } from '@/hooks/use-api-query'
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile'
import { User } from '@/types/user'

function StudentCards({ students }: { students: User[] }) {
  return (
    <div className="grid gap-4">
      {students.map((student) => (
        <Card key={student.id}>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {student.first_name[0]}
                  {student.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium">
                  {student.first_name} {student.last_name}
                </h3>
                <p className="text-muted-foreground text-sm">{student.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StudentTable({ students }: { students: User[] }) {
  return (
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
              <TableCell className="capitalize">Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function StudentList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const { data: students, isFetching } = useGetStudentList(search)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  if (isFetching) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!students?.length) {
    return (
      <div className="text-muted-foreground rounded-lg border p-4 text-center">
        No students found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isMobile || isTablet ? (
        <StudentCards students={students} />
      ) : (
        <StudentTable students={students} />
      )}
    </div>
  )
}
