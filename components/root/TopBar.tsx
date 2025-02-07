'use client';
import React, { useState } from 'react'
import ThemeButton from '../ThemeButton'
import { Bell, ChevronDown, LogOut, MessageSquareText, PanelLeft, Search, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useSideBar } from '@/Context/SideBarContext'
import { useSession, signOut } from 'next-auth/react';
import Avatar from '../Avatar';
import { getAvatarUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { usePageLoading } from '@/Context/LoadingContext';

export default function TopBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const {sideBarOpen, setSideBarOpen } = useSideBar();
    const { data: session } = useSession();
    const { setPageLoading } = usePageLoading();

    async function handleLogout() {
        setPageLoading(true);
        await signOut();
        router.replace('/ask-login-type');
        setPageLoading(false);
      }

    return (
        <div className='py-5 px-5 flex justify-between border-b dark:border-slate-700 bg-white dark:bg-slate-800 z-50'>
            <div className='flex gap-2 items-center'>
                <button className='mr-5' onClick={() => setSideBarOpen(!sideBarOpen)}>
                    <PanelLeft className='dark:text-white' strokeWidth={1.5} size={18} />
                </button>
                <div className='px-4 bg-secondary-100 dark:bg-slate-700 flex items-center rounded-md gap-2 border dark:border-secondary-800'>
                    <Search size={16} className='text-secondary-800 dark:text-secondary-200' />
                    <input type="search" placeholder='Search' className='dark:text-white py-2 bg-transparent outline-none border-none text-sm' />
                </div>
                <ul className='ml-8 text-sm flex items-center text-secondary-900 dark:text-secondary-200 gap-8'>
                    <li><Link href={'#'}>Documents</Link></li>
                    <li><Link href={'#'}>News</Link></li>
                    <li><Link href={'#'}>Payslip</Link></li>
                    <li><Link href={'#'}>Report</Link></li>
                </ul>
            </div>
            <div className='flex gap-5 items-center'>
                <Bell size={18} className='dark:text-white' />
                <MessageSquareText size={18} className='dark:text-white' />
                <ThemeButton size={18} />

                <div className='bg-amber-500/10  text-amber-500 rounded-md font-bold text-xs px-3 py-1.5'>
                    {!session?.user.adminAccess ? 'Employee' : 'Admin'} Account
                </div>

                {/* Top bar logged in User Avatar */}
                <div className='flex items-center gap-1 relative'>
                    <Avatar size={30} src={session?.user.avatar ? session.user.avatar : getAvatarUrl(`${session?.user.firstName} ${session?.user.lastName}`)} />
                    <button 
                        type='button' 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="focus:outline-none"
                    >
                        <ChevronDown size={18} className='dark:text-white' />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700">
                            <div className="py-1">
                                <Link
                                    href={`/employee-profile/${session?.user._id}` }
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                >
                                    <UserRound size={16} />
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
