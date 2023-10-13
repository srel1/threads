"use client"
import { usePathname, useRouter } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image'

const Bottombar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className='fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden'>
      <div className='flex items-center justify-between gap-3 xs:gap-5'>
      {sidebarLinks.map((links) => {
            const isActive = (pathname.includes(links.route) && links.route.length > 1 )|| pathname === links.route;
            return (
                <Link 
                href={links.route}
                key={links.label}
                className={ `relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:py-2.5 ${ isActive &&  `bg-primary-500`}`}
                >
                  <Image src={links.imgURL}
                  alt={links.label}
                  width={24}
                  height={24}
                  />
                  <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                    {links.label.split(/\s+/)[0]}
                  </p>
                </Link>
              ) 
          })}
      </div>
    </section>
  )
}

export default Bottombar