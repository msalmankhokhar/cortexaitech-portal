'use client';
// import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  // if(true) redirect('/ask-login-type');

  return (
    <main className="maxContainer flex h-screen overflow-hidden">
      <div className="text-2xl p-10 text-center">
        {
          status === 'authenticated' ? (
            `Logged in as ${session.user.name}`
          ) : 'You are not logged in'
        }
      </div>
    </main>
  );
}