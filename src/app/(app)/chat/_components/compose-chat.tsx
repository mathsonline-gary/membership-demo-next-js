import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
]

const composeFormSchema = z.object({
  receiver_id: z.number().min(1, 'Please select a receiver'),
  message: z.string().min(1, 'Message cannot be empty'),
})

type ComposeFormValues = z.infer<typeof composeFormSchema>

export function ComposeChat() {
  const form = useForm<ComposeFormValues>({
    resolver: zodResolver(composeFormSchema),
    defaultValues: {
      receiver_id: undefined,
      message: undefined,
    },
  })

  function onSubmit(data: ComposeFormValues) {
    console.log('form data:', data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-y-4"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-md font-medium">To:</h3>
          <FormField
            control={form.control}
            name="receiver_id"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a receiver" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USERS.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex flex-1 flex-col items-center justify-center">
          <Image
            src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/empty/ic-chat-active.svg"
            alt="Chat placeholder"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="text-muted-foreground text-center font-medium">
            Write something awesome!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Type a message..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Form>
  )
}
