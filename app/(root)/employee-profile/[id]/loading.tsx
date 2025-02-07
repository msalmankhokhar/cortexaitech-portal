
export default function EmployeeProfileLoading() {
    return (
        <>
            <main className="px-7 pb-5 bg-secondary-100 dark:bg-slate-900 flex flex-col relative">
                <div className="flex py-7 items-center dark:text-white gap-3">
                    <button className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-6 rounded"></button>
                    <p className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-40 rounded"></p>
                </div>
                <section className="flex gap-7">
                    <aside className="min-w-[260px] bg-white dark:bg-slate-800 rounded-lg px-5 self-start">
                        <div className="py-5 flex flex-col items-center border-b dark:border-secondary-700">
                            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 w-16 rounded-full"></div>
                            <div className="flex items-center flex-col mt-3 w-full">
                                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded mb-2"></div>
                                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded"></div>
                                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-20 rounded mt-3"></div>
                            </div>
                        </div>

                        <div className="py-5 space-y-4 border-b dark:border-secondary-700">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-5 rounded"></div>
                                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
                                </div>
                            ))}
                        </div>

                        <div className="py-5 space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-3 w-20 rounded"></div>
                                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded"></div>
                                </div>
                            ))}
                            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-full rounded mt-3"></div>
                        </div>
                    </aside>

                    <aside className="bg-white dark:bg-slate-800 rounded-lg p-5 w-full">
                        <div className="flex gap-4 border-b dark:border-secondary-700 pb-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-20 rounded"></div>
                            ))}
                        </div>

                        <div className="py-5 space-y-5">
                            {[1, 2].map(section => (
                                <div key={section} className="rounded-lg border dark:border-secondary-700">
                                    <div className="p-5 flex justify-between border-b dark:border-secondary-700">
                                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-40 rounded"></div>
                                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-6 rounded"></div>
                                    </div>
                                    <div className="p-5 grid grid-cols-2 gap-5">
                                        {[1, 2, 3, 4, 5].map(item => (
                                            <div key={item} className="flex gap-3 items-center">
                                                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded"></div>
                                                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>
            </main>
        </>
    )
}