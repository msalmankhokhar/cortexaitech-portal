'use client';
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="maxContainer flex h-screen overflow-hidden">
      <div className="text-2xl p-10 text-center">
        {
          status === 'authenticated' ? (
            <>
            {`Logged in as ${session.user.name}`}
            <div className="my-5">
              <Button onClick={async()=>{await signOut()}}>Logout</Button>
            </div>
            </>
          ) : redirect('/ask-login-type')
        }
      </div>
    </main>
  );
}