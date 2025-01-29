"use client";
import Button from "@/components/Button";
import { PageSpinner } from "@/components/Spinner";
import { usePageLoading } from "@/Context/LoadingContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const { setPageLoading } = usePageLoading();
  const router = useRouter();

  // Wait for session loading
  if (status === 'loading') {
    return <PageSpinner />;
  }

  // Only redirect if we're certain there's no session
  if (status === 'unauthenticated') {
    router.replace('/ask-login-type');
    return null;
  }

  async function handleLogout() {
    setPageLoading(true);
    await signOut();
    router.replace('/ask-login-type');
    setPageLoading(false);
  }

  return (
    <main className="maxContainer flex min-h-screen overflow-hidden">
      <div className="text-2xl p-10 text-center">
        {session?.user?.name && (
          <>
            {`Logged in as ${session.user.name}`}
            <div className="my-5">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}