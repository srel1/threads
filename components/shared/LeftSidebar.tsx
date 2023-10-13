"use client"

import React from 'react'
import Link from 'next/link';   
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className='custom-scrollbar no-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden'>
        <div className='flex w-full flex-1 flex-col gap-6 px-4'>
          {sidebarLinks.map((links) => {
            const isActive = (pathname.includes(links.route) && links.route.length > 1 ) || pathname === links.route;
            
            if(links.route === '/profile') links.route = `${links.route}/${userId}`

            return (
                <Link 
                href={links.route}
                key={links.label}
                className={ `relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-primary-500'}`}
                >
                  <Image src={links.imgURL}
                  alt={links.label}
                  width={24}
                  height={24}
                  />
                  <p className='text-light-1 max-lg:hidden'>
                    {links.label}
                  </p>
                </Link>
              )
          })}
        </div>

      <div className='flex w-full justify-start px-8 mb-0'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex cursor-pointer'>
              <Image src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}

              />
              <p className='text-light-1 max-lg:hidden px-4'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar