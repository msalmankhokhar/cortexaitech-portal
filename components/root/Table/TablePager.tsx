import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TablePager() {
    return (
        <div className="flex gap-3">
            <button className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800">
                <ChevronLeft size={18} className="dark:text-white" />
            </button>
            <div className="flex gap-3">
                <Link href={'#'} className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800">
                    <span className="dark:text-white text-sm">1</span>
                </Link>
                <Link href={'#'} className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800">
                    <span className="dark:text-white text-sm">2</span>
                </Link>
                <Link href={'#'} className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800">
                    <span className="dark:text-white text-sm">3</span>
                </Link>
                <div className="font-bold">
                    <span className="dark:text-white text-sm">...</span>
                </div>
                <Link href={'#'} className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800">
                    <span className="dark:text-white text-sm">10</span>
                </Link>
            </div>
            <button className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800">
                <ChevronRight size={18} className="dark:text-white" />
            </button>
        </div>
    )
}
