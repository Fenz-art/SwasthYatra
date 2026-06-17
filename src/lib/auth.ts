import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-secret",
    }),
    CredentialsProvider({
      name: "Test Mode",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@swasthyatra.com" }
      },
      async authorize(credentials) {
        const email = credentials?.email as string || "test@swasthyatra.com";
        let user = await prisma.user.findFirst({
          where: { email }
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: "Sarah Jenkins",
              role: "PATIENT",
              onboardingCompleted: true,
            }
          });
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt", // Using JWT for server actions/edge compatibility
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Fetch role from DB in production, defaulting to PATIENT
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! }});
        token.role = dbUser?.role || "PATIENT";
        token.onboardingCompleted = dbUser?.onboardingCompleted || false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

// Extend TypeScript types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      onboardingCompleted: boolean;
    }
  }
}
