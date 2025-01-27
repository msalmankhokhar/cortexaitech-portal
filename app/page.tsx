// import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

export default async function Home() {
  const session = await getSession();

  // if(true) redirect('/ask-login-type');

  return (
    <main className="maxContainer flex h-screen overflow-hidden">
      <div className="text-2xl p-10 text-center">
        {
          session ? session.user.name : 'You are not logged in'
        }
      </div>
    </main>
  );
}