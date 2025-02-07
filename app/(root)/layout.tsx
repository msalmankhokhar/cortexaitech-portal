'use client'
import SideBar from '@/components/root/SideBar';
import TopBar from '@/components/root/TopBar';
import { PageSpinner } from '@/components/Spinner';
import { usePageLoading } from '@/Context/LoadingContext';
import SideBarProvider from '@/Context/SideBarContext';
import SideBarModalProvider from '@/Context/SideModalContext';
import React, { Suspense } from 'react'

export default function RootlayoutSecondary({ children }: { children: React.ReactNode }) {

    const { pageLoading } = usePageLoading();

    return (
        <>
        <SideBarProvider>
            <SideBarModalProvider>
                {
                    pageLoading && (
                        <PageSpinner />
                    )
                }
                <div className='maxContainer flex max-w-screen dark:bg-slate-800'>
                    <SideBar />
                    <div className='flex flex-col flex-1 min-h-screen'>
                        <TopBar />
                        <Suspense fallback={<PageSpinner />}>
                        {children}
                        </Suspense>
                    </div>
                </div>
            </SideBarModalProvider>
        </SideBarProvider>
        </>
    )
}
