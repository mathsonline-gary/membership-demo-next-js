import { BookCheck } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const lessons = [
  { title: 'React Basics', date: '2024-06-10', status: 'Scheduled' },
  { title: 'Advanced TypeScript', date: '2024-06-11', status: 'Draft' },
  { title: 'Next.js Routing', date: '2024-06-12', status: 'Published' },
]

export function DashboardLessonsOverview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          <BookCheck className="text-muted-foreground h-8 w-8" />
          <div>
            <CardTitle>Lessons</CardTitle>
            <CardDescription>Upcoming lessons</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.title}>
                <TableCell>{lesson.title}</TableCell>
                <TableCell>{lesson.date}</TableCell>
                <TableCell>{lesson.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
