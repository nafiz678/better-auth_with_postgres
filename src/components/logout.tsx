
'use client';

import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Logout() {
    const router = useRouter()
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.refresh();
                    router.push("/login")
                }
            }
        })
        toast.success("Signed Out success")
    }
    return (
        <Button variant="destructive" onClick={handleLogout}>
            Logout
        </Button>
    )
}