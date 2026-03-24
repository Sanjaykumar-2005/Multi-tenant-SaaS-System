import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true },
        });

        // Auto-seed for demo if user doesn't exist
        if (!user && credentials.email === 'admin@tenant-a.com' && credentials.password === 'password') {
          const tenant = await prisma.tenant.create({
            data: { name: 'Tenant A', domain: 'tenant-a.com' }
          });
          user = await prisma.user.create({
            data: {
              email: 'admin@tenant-a.com',
              password: 'password',
              name: 'Admin User',
              tenantId: tenant.id,
              role: 'ADMIN'
            },
            include: { tenant: true }
          });
          await prisma.resource.createMany({
            data: [
              { name: 'Product Roadmap Q3', data: 'Confidential roadmap data', tenantId: tenant.id },
              { name: 'Customer List', data: '243 contacts', tenantId: tenant.id },
              { name: 'Financial Report 2026', data: 'Revenue and Expenses summary', tenantId: tenant.id }
            ]
          });
        }

        // Basic verification (in a real app, use bcrypt to compare hashes)
        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          tenantId: user.tenantId,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tenantId = user.tenantId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.tenantId = token.tenantId as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login'
  }
};
