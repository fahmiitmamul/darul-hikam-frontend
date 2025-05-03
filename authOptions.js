// authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ganti dengan validasi user dari database
        if (
          credentials?.username === "agusabdulaziz@gmail.com" &&
          credentials?.password === "aksesadmin"
        ) {
          return {
            id: "1",
            name: "Agus Abdul Aziz",
            email: "agusabdulaziz@gmail.com",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // buat .env dengan kunci ini
};
