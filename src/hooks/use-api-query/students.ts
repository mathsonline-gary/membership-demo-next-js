import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export const useGetStudentList = (search: string | null) => {
  return useQuery({
    queryKey: ['students', search],
    queryFn: () => api.students.index(search),
  })
}
