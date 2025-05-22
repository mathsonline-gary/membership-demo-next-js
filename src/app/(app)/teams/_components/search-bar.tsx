import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'

export function SearchBar() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const query = searchParams.get('query') || ''
  const [input, setInput] = React.useState(query)

  React.useEffect(() => {
    setInput(query)
  }, [query])

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
      <Input
        placeholder="Search teams..."
        className="pl-8"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          handleSearch(e.target.value)
        }}
      />
    </div>
  )
}
