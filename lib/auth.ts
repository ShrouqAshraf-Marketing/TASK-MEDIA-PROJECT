import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Fallback Dummy Accounts for Testing on Netlify (Bypass SQLite issues)
          if (credentials.email === "admin@taskmedia.com") {
             return { id: "admin-1", name: "مدير النظام", email: "admin@taskmedia.com", role: "ADMIN" };
          }
          if (credentials.email === "client@taskmedia.com") {
             return { id: "client-1", name: "عميل تجريبي", email: "client@taskmedia.com", role: "CLIENT" };
          }
          if (credentials.email === "marketer@taskmedia.com") {
             return { id: "marketer-1", name: "مسوق تجريبي", email: "marketer@taskmedia.com", role: "MARKETER" };
          }

          // Use cast to any to avoid issues if Prisma Client is out of sync
          const user = await (prisma.user as any).findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
