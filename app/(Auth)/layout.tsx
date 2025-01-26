import Logo from "@/components/Logo";
import ThemeButton from "@/components/ThemeButton";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="maxContainer flex h-screen overflow-hidden bg-secondary-100 dark:bg-slate-800">


            <div className="relative flex flex-col justify-center px-3 sm:px-5 md:px-10 py-7 max-w-[560px] mx-auto w-full">
                <div className="flex items-center justify-between mb-10">
                    <Logo />
                    <ThemeButton />
                </div>
                <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-secondary-300 dark:border-slate-600">
                    <div className="bg-secondary-1000 dark:bg-white px-10 py-5">
                        <h1 className="text-white dark:text-black font-semibold text-xl">Online Staff Portal</h1>
                    </div>
                    <div className="px-10 pb-10 pt-10">
                        {children}
                    </div>
                </div>
            </div>

            {/* AUTH PAGES SIDE IMAGE: UN-COMMENT TO USE */}

            {/* <div className="relative h-full max-w-[864px] min-w-[650px]">
                <Image
                    alt='robot'
                    src={'/img/auth/robot.jpg'}
                    fill
                    objectFit="cover"
                    objectPosition="top"
                    className="aspect-[1117/864]"
                />
            </div> */}

        </main>
    );
}