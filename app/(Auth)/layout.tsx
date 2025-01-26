import Logo from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="maxContainer flex h-screen overflow-hidden bg-secondary-100">

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

            <div className="flex flex-col justify-center px-3 sm:px-5 md:px-10 py-7 max-w-[560px] mx-auto w-full">
                <Logo className="mb-7" />
                <div className="rounded-xl overflow-hidden bg-white border border-secondary-300">
                    <div className="bg-secondary-1000 px-10 py-3">
                        <h1 className="text-white font-semibold text-xl">Online Staff Portal</h1>
                    </div>
                    <div className="px-10 pb-10 pt-10">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}