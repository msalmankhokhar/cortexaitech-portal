'use client'
import Logo from "@/components/Logo";
import ThemeButton from "@/components/ThemeButton";
import Image from "next/image";
import { Suspense } from "react";
import { PageSpinner } from "@/components/Spinner";
import { usePageLoading } from "@/Context/LoadingContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { pageLoading } = usePageLoading();
    return (
        <main className={`maxContainer flex flex-wrap bg-secondary-100 dark:bg-slate-800`}>

            {
                pageLoading && (
                    <PageSpinner />
                )
            }

            <div className="relative flex flex-col sm:justify-center px-5 md:px-10 py-7 max-w-[560px] mx-auto w-full">
                <div className="px-5 sm:px-0 flex items-center justify-between mb-5 sm:mb-7">
                    <Logo />
                    <ThemeButton />
                </div>
                <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-secondary-300 dark:border-slate-600">
                    <div className="bg-secondary-1000 dark:bg-white px-5 sm:px-10 py-5">
                        <h1 className="text-white dark:text-black font-semibold text-xl">HR Management Dashboard</h1>
                    </div>
                    <div className="px-5 sm:px-10 pb-5 sm:pb-8 pt-10">
                        <Suspense
                            fallback={(
                                <PageSpinner />
                            )}
                        >
                            {children}
                        </Suspense>
                    </div>
                </div>
                <p className="mt-3 text-center text-xs text-secondary-600 dark:text-secondary-300">Copyright &copy; Cortex AI Tech</p>
            </div>

            {/* AUTH PAGES SIDE IMAGE: UN-COMMENT TO USE */}

            <div className="sticky top-0 h-screen w-[50%] hidden min-[1120px]:block">
                <Image
                    alt='robot'
                    src={'/img/auth/robo3.webp'}
                    fill
                    objectFit="cover"
                    objectPosition="top"
                    className="aspect-[1117/864]"
                />
            </div>

        </main>
    );
}