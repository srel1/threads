"use client"

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter} from 'next/navigation'
import { CommentValidation, ThreadValidation } from '@/lib/validations/threads';
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import * as z from "zod"  
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({threadId, currentUserImg, currentUserId}: Props) => {
    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: '',
      }
    });
  
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col !important"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image 
                    src={currentUserImg}
                    alt="Profile Image"
                    width={48}
                    height={48}
                    className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className='no-focus text-light-1 outline-none'
                  {...field}
                 />
              </FormControl>
            <FormMessage/>
          </FormItem>
          )}
        />
        <Button type="submit" className="rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full !important">
            Reply
        </Button>

      </form>
    </Form>
  )
}

export default Comment