import { redirect } from "next/navigation";

export default function Home() {

  if(true) redirect('/ask-login-type');

  return (
    <main className="maxContainer flex h-screen overflow-hidden">
      <h1>Home</h1>
    </main>
  );
}