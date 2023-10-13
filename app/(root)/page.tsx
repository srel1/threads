import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  console.log(result, 'home')
  const user = await currentUser();

  return (
    <>
      <h1 className="text-heading2-bold text-light-1 text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
        <p className="text-center !text-base-regular text-light-3">No threads found</p>
        ): (
          <>
            {result.posts.map((post) => (
              <ThreadCard key={post._id}
              id={post._id}
              currentUserId={user?.id || ""}
              parentId={post.parentId}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt} 
              content={post.text} 
              comments={post.children}              
              />
            ))}
          </>
        )
      }
      </section>
    </>
  )
}