import * as AvatarPrimitive from '@radix-ui/react-avatar'

import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarUI,
} from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { User } from '@/types'

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  user: User | null
  className?: string
}

export const Avatar = ({ className, user, ...props }: AvatarProps) => {
  return (
    <AvatarUI className={cn('', className)} {...props}>
      <AvatarImage
        src={user?.avatar || 'https://github.com/shadcn.png'}
        alt={user?.full_name || 'avatar'}
      />
      <AvatarFallback>
        {user?.first_name.charAt(0) ?? 'A'}
        {user?.last_name.charAt(0) ?? ''}
      </AvatarFallback>
    </AvatarUI>
  )
}
