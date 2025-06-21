import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function GetUser() {
    const user = await auth.api.getSession({
    headers: await headers()
  })
  return user?.user
}
