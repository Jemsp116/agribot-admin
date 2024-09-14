"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { siteMap } from '@/config/site'
import Image from 'next/image'

const Nav = ({ show }) => {
    const inactiveLinks = 'flex gap-2 px-4 py-2 '
    const activeLinks = inactiveLinks + ' text-black font-semibold rounded-md text-primary bg-blue-100'
    const inactiveIcons = 'w-6 h-6';
    const activeIcons = inactiveIcons + ' text-primary';
    const pathname = usePathname();
    const router = useRouter();

    const logout = async () => {
        router.push('/');
        // await signOut();
    }

    return (
        <aside className={`text-gray-600 p-4 fixed bg-bgGray h-full ${show ? 'right-0' : '-right-full'} md:static w-[250px] transition-all`}>
            <div className='hidden md:block'>
                <Logo />
            </div>
            <nav className='flex flex-col gap-2'>
                {siteMap.map((item) => (
                    <Link key={item.link} className={(pathname === item.link) ? activeLinks : inactiveLinks} href={item.link}>
                        <Image src={item.icon} alt={item.label} width={24} height={24} className={(pathname === item.link) ? activeIcons : inactiveIcons} />
                        {item.label}
                    </Link>
                ))}

                {/* <button className={inactiveLinks} onClick={logout}>
                    <Image src={'/Logout.svg'} alt='logout' width={24} height={24} className={activeIcons} />
                    Logout
                </button> */}
            </nav>


        </aside>
    )
}

export default Nav
