import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

async function Page() {
    const user = await currentUser();
    //console.log(`before userInfo at createThread`, user?.id)

    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    console.log(userInfo)
    if(!userInfo?.onboarded) redirect('/onboarding');

    return(
        <>
            <h1 className="text-heading2-bold text-light-1">Create Thread</h1>
            <PostThread userId={userInfo._id}/>
        </>
    )
}


export default Page