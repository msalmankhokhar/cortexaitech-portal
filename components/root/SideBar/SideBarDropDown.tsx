import { ChevronDown, ChevronUp, UsersRound } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface sideBarLinkDataProp {
    title: string;
    url?: string;
}

export interface sideBarDropDownProps {
    title?: string;
    items?: sideBarLinkDataProp[];
    icon?: React.ReactNode;
}

const defaultProps: sideBarDropDownProps = {
    title: 'Employees',
    icon: (<UsersRound strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    items: [
        {
            title: 'Manage Employees',
            url: '#',
        },
        {
            title: 'Directory',
            url: '#'
        },
        {
            title: 'ORG Chart',
            url: '#'
        },
    ]
}

export default function SideBarDropDown({ title = defaultProps.title, items = defaultProps.items, icon }: sideBarDropDownProps) {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div>
            <button onClick={handleClick} className='rounded-md px-2 py-3.5 hover:bg-secondary-100 dark:hover:bg-slate-700 w-full text-sm text-secondary-900 font-medium relative flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {icon}
                    <span className='dark:text-white font-bold'>{title}</span>
                </div>
                {
                    open ? (
                        <ChevronUp className='dark:text-white' strokeWidth={1.5} size={20} />
                    ) : (
                        <ChevronDown className='dark:text-white' strokeWidth={1.5} size={20} />
                    )
                }
            </button>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={'dropdown'}
                    initial="collapsed"
                    animate={open ? "expanded" : "collapsed"}
                    variants={{
                        expanded: {
                            opacity: 1,
                            height: "auto",
                            display: "flex",
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                                display: { delay: 0 }
                            }
                        },
                        collapsed: {
                            opacity: 0,
                            height: 0,
                            display: "none",
                            transition: {
                                duration: 0.3,
                                ease: "easeIn",
                                display: { delay: 0.3 }
                            }
                        }
                    }}
                    className="flex-col ml-3 pl-3 border-l dark:border-secondary-700 overflow-hidden"
                >
                    {
                        items!.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    expanded: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.1 }
                                    },
                                    collapsed: {
                                        opacity: 0,
                                        y: -10
                                    }
                                }}
                            >
                                <Link
                                    className='rounded-md px-2 py-3 hover:bg-secondary-100 dark:hover:bg-slate-700 w-full text-sm text-secondary-900 font-medium relative flex items-center justify-between'
                                    href={item.url ? item.url : '#'}
                                >
                                    <div className='flex items-center gap-3'>
                                        <span className='dark:text-white line-clamp-1 text-nowrap font-bold'>{item.title}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                        )
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
