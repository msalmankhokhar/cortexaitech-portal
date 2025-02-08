"use client";
import Button from "@/components/Button";
import { PageSpinner } from "@/components/Spinner";
import { usePageLoading } from "@/Context/LoadingContext";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const { setPageLoading } = usePageLoading();
  const router = useRouter();

  // Wait for session loading
  if (status === 'loading') {
    return <PageSpinner />;
  } else if (status === 'authenticated') {
    const redirectUrl = session?.user.adminAccess ? '/manage-employees' : `/employee-profile/${session?.user._id}`;
    redirect(redirectUrl);
  }

  // // Redirect to login page if not logged in
  // if (status === 'unauthenticated') {
  //   router.replace('/ask-login-type');
  //   return null;
  // }

  async function handleLogout() {
    setPageLoading(true);
    await signOut();
    // router.replace('/ask-login-type');
    router.refresh();
    setPageLoading(false);
  }

  return (
    <>
      <main className="px-7 pb-5 bg-secondary-100 dark:bg-slate-900 flex flex-col relative">
        <div className="dark:text-white pt-5">Hello, Mr. {(session! as Session)?.user!.firstName}</div>
        <Button onClick={handleLogout}>Log out</Button>
      </main>
    </>
  );
}