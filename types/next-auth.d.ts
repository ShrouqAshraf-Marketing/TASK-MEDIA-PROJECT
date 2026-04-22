import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CLIENT" | "MARKETER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "CLIENT" | "MARKETER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "CLIENT" | "MARKETER" | "ADMIN";
  }
}
