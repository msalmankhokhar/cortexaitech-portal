import React from 'react'
import Logo from '@/components/Logo'
import { CircleHelp, LayoutGrid, Settings } from 'lucide-react'
import { sideBarItemsData } from '@/Constants'
import SideBarDropDown from './SideBarDropDown'
import SideBarButton from './SideBarButton'
import { useSideBar } from '@/Context/SideBarContext'
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react'

// Max Sidebar width: 260px

export default function SideBar() {

    const { sideBarOpen } = useSideBar();
    const { data: session } = useSession();
    const sideBarItems = session?.user?.adminAccess ? sideBarItemsData.admin : sideBarItemsData.employee;

    return (
        <div className="overflow-hidden">
            <motion.div
                initial={sideBarOpen ? "open" : "closed"}
                animate={sideBarOpen ? "open" : "closed"}
                variants={{
                    open: {
                        padding: "0.875rem",
                        display: "flex",
                        width: "260px",
                        opacity: 1,
                        transition: {
                            duration: 0.2,
                            ease: "easeOut"
                        }
                    },
                    closed: {
                        opacity: 0,
                        width: "0px",
                        display: "none",
                        padding: "0px",
                        transition: {
                            duration: 0.2,
                            ease: "easeIn"
                        }
                    }
                }}
                className={`dark:bg-slate-800 border-r dark:border-slate-700 flex-col`}
            >
                <div>
                    <div className='pt-1.5 pb-5 pl-2'>
                        <Logo sizeMultiplier={0.7} size={{ text: 170 }} />
                    </div>
                    <button className='rounded-md px-4 py-3.5 w-full text-sm bg-primary text-secondary-900 relative flex items-center justify-between'>
                        <span className='font-extrabold'>HR Dashboard</span>
                        <LayoutGrid strokeWidth={1.5} size={20} />
                    </button>
                    <div className='flex flex-col pt-5 pb-8 gap-2'>
                        {
                            sideBarItems.map((sideBarItem, index) => (
                                <SideBarDropDown
                                    key={index}
                                    {...sideBarItem}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <SideBarButton
                        title='Help Center'
                        icon={<CircleHelp strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />}
                    />
                    <SideBarButton
                        title='Settings'
                        icon={<Settings strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />}
                    />
                </div>
            </motion.div>
        </div>
    )
}
