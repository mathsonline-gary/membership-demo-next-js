'use client'

import { BookOpen } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { status: 'Published', value: 5, fill: 'var(--chart-1)' },
  { status: 'Draft', value: 3, fill: 'var(--chart-2)' },
]

const chartConfig = {
  value: {
    label: 'Courses',
  },
  Published: {
    label: 'Draft',
    color: 'var(--chart-1)',
  },
  Draft: {
    label: 'Published',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function DashboardCoursesOverview() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex flex-row items-center gap-4">
          <BookOpen className="text-muted-foreground h-8 w-8" />
          <div>
            <CardTitle>Courses</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <PieChart width={300} height={300} className="h-full w-full">
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={80}
              outerRadius={120}
              cx="50%"
              cy="50%"
              label={false}
              isAnimationActive
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none font-medium">Published vs Draft</div>
      </CardFooter>
    </Card>
  )
}
