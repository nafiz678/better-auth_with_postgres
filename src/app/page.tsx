import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  const user = await auth.api.getSession({
    headers: headers()
  })

  if (!user?.user) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <h1 className="text-6xl">Welcome</h1>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <h1 className="text-6xl">welcome {user.user.name}</h1>
    </section>
  );
}
