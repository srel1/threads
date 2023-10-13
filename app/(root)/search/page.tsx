import Image from 'next/image';
import { profileTabs } from '@/constants';
import  ThreadsTab  from '@/components/shared/ThreadsTab';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import UserCard from '@/components/cards/UserCard';

async function Page(){
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    console.log(user.id, 'user.id tests', userInfo)
    const result = await fetchUsers({
      userId: user.id,
      searchString: '',
      pageNumber: 1,
      pageSize: 25
    })

    console.log(result, 'logging results from fetchUsers()')

  return (
    <section>
        <h1 className='head-text mb-10'>
            Communities

            <div className='mt-14 flex flex-col gap-9'>
              {result.users.length === 0 ? (
                <p className='text-center !text-base-regular text-light-3'>No users</p>
              ) : (
              <>
                {result.users.map((person) => (
                  <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType='User'
                  />
                ))}
              </>
              )}
            </div>
        </h1>
    </section>
  )
}

export default Page