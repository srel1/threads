import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string}}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const thread = await fetchThreadById(params.id)

    return (
        <section className="relative">
            <div>
                <ThreadCard 
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt} 
                    content={thread.text} 
                    comments={thread.children} 
                />
            </div>
        
            <div >
                <Comment
                    threadId={thread._id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className='mt-10'>
            {thread.children.map((childItem: any) => (
              <ThreadCard key={childItem._id}
              id={childItem._id}
              currentUserId={childItem?.id || ""}
              parentId={childItem.parentId}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt} 
              content={childItem.text} 
              comments={childItem.children}
              isComment              
              />
            ))}
          </div>

        </section>
    )
}

export default Page;