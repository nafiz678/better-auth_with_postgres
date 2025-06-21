import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Logout from './logout';

export default async function Header() {
    const user = await auth.api.getSession({
        headers: headers(),
    });

    return (
        <nav className="w-full fixed border-b bg-background px-4 py-3 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    Better auth
                </Link>

                <div className="flex items-center gap-4">
                    {!user?.user ? (
                        <>
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button>Signup</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user.user.image || "https://github.com/shadcn.png"} alt="@shadcn" />
                                <AvatarFallback className='uppercase'>{user.user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <Logout />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
