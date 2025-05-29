import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const messageFormSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
})

type MessageFormValues = z.infer<typeof messageFormSchema>

export function ChatMessages() {
  const messages = [
    {
      id: 1,
      content: 'Hello, how are you?',
      sender: 'user',
      timestamp: new Date(),
    },
    {
      id: 2,
      content: 'I am fine, thank you!',
      sender: 'other',
      timestamp: new Date(),
    },
  ]

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: '',
    },
  })

  function onSubmit(data: MessageFormValues) {
    console.log('message: ', data.message)
    form.reset()
  }

  return (
    <div className="flex h-full flex-col gap-y-4">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="font-semibold">Chat Support</h2>
          <p className="text-muted-foreground text-sm">test@test.com</p>
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2',
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted'
              )}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
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
          </form>
        </Form>
      </div>
    </div>
  )
}
