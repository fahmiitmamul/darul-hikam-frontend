import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/(santri|kelembaagaan|ustadz|buku-pelajaran)/:path*"],
};
