import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 15 * 60,
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});


export type Session = typeof auth.$Infer.Session;