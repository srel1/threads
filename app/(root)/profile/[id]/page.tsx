import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import  Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";

async function Page({ params }: {params: { id: string }}) {
    const user = await currentUser();
    //console.log(`before userInfo at createThread`, user?.id)

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={userInfo.id}
                name={userInfo.name}
                userName={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            
            <div className="mt-9 ">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 text-light-2 
                    data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 !important">
                        {profileTabs.map((item) => (
                            <TabsTrigger key={item.label} value={item.value} className="flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 text-light-2 
                            data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 !important">
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    height={24}
                                    width={24}
                                    className='object-contain'
                                />
                                <p className="max-sm:hidden">{item.label}</p>
                                {item.label == "Threads" && 
                                <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                                    {userInfo?.threads?.length}
                                </p>
                                }
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((item) => (
                        <TabsContent key={`content-${item.label}`} value={item.value}
                         className='w-full text-light-1'>
                            {/* @ts-ignore */}
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>

            </div>


        </section>
    )
}

export default Page
