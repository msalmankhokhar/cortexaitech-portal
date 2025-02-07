import { UsersRound } from 'lucide-react'
import React from 'react'
import Link from 'next/link';

export interface sideBarDropDownProps {
    title?: string;
    icon?: React.ReactNode;
}

const defaultProps: sideBarDropDownProps = {
    title: 'Employees',
    icon: (<UsersRound strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
}

export default function SideBarButton({ title = defaultProps.title, icon }: sideBarDropDownProps) {

    return (
        <div>
            <Link href={'#'} className='rounded-md px-2 py-3.5 hover:bg-secondary-100 dark:hover:bg-slate-700 w-full text-sm text-secondary-900 font-medium relative flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {icon}
                    <span className='dark:text-white font-bold'>{title}</span>
                </div>
            </Link>
        </div>
    )
}
