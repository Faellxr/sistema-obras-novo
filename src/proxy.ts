import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/obras/:path*",
    "/serventes/:path*",
    "/apontamentos/:path*",
    "/tarefas/:path*",
    "/calendario/:path*",
  ],
};