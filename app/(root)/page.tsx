'use client';
import Button from "@/components/Button";
import { usePageLoading } from "@/Context/LoadingContext";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';
  const { setPageLoading } = usePageLoading();
  const router = useRouter();

  if (!authenticated) return redirect('/ask-login-type');

  async function handleLogout() {
    setPageLoading(true);
    await signOut();
    router.push('/ask-login-type');
    router.refresh();
    setPageLoading(false);
  }

  return (
    <main className="maxContainer flex h-screen overflow-hidden">
      <div className="text-2xl p-10 text-center">
        {
          authenticated && (
            <>
              {`Logged in as ${session.user.name}`}
              <div className="my-5">
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </>
          )
        }
      </div>
    </main>
  );
}