
"use client";

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "../ui/password-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(1).min(3),
    email: z.string(),
    password: z.string()
});

export default function Signup() {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            setLoading(true)
            const { data, error } = await authClient.signUp.email({
                email: values.email,
                name: values.name,
                password: values.password,
                callbackURL: "/"
            }, {
                onRequest: () => {
                    //show loading
                    setLoading(true)
                },
                onSuccess: (ctx) => {
                    //redirect to the dashboard or sign in page\
                    console.log(ctx.data.user)
                    setLoading(false)
                    router.push("/")
                },
                onError: (ctx) => {
                    // display the error message
                    toast.error(ctx.error.message);
                },
            })

            if (data) return toast.success(`Welcome back ${data.user.name}`)
            else if (error) return toast.error(error.message)
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
        finally{
            router.refresh()
            router.push("/")
        }
    }
    console.log(loading)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-3xl mx-auto pb-5">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your name"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Emaiil</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="m@example.com"

                                            type="email"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="••••••••" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full flex items-center justify-center">
                            {loading ? <Loader2 className="animate-spin" /> : "Create account"}
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/login" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}