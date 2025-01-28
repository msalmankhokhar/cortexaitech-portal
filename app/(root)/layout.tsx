'use client'
import { PageSpinner } from '@/components/Spinner';
import { usePageLoading } from '@/Context/LoadingContext';
import React from 'react'

export default function RootlayoutSecondary({ children }: { children: React.ReactNode }) {

    const { pageLoading } = usePageLoading();

    return (
        <>
            {
                pageLoading && (
                    <PageSpinner />
                )
            }
            {children}
        </>
    )
}
