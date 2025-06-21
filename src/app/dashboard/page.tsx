// import { auth } from "@/lib/auth";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function page() {

//   const session = await auth.api.getSession({ cookies })

//   if (!session?.user) {
//     return redirect("/login");
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Welcome, {session.user.email}</h1>
//     </div>
//   )
// }
import React from 'react'

export default function page() {
  return (
    <div>
      dashboard
    </div>
  )
}
