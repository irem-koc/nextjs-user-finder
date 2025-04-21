import axios from "axios";
import * as https from "https";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const newCre = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const user = await axios
          .post("/auth/login", newCre, {
            headers: {
              "Content-Type": "application/json",
              "user-type": "merchant",
              "access-from": "web",
            },
            httpsAgent,
            baseURL: process.env.NEXT_PUBLIC_API_URL,
          })
          .catch((error) => {
            if (error.response) {
              throw new Error(
                error.response.data?.message || "Bir hata oluştu"
              );
            } else {
              throw new Error("Sunucuya bağlantı sağlanamadı");
            }
          });

        if (user?.data?.token) {
          return user.data; // token varsa döner
        } else {
          throw new Error("Geçersiz giriş bilgileri");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
        token.accessTokenExpiry = Date.now() + 15 * 60 * 1000;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
      }

      // token'ın süresinin geçip geçmediğini kontrol et
      const shouldRefreshTime = Math.round(
        (token.accessTokenExpiry - Date.now()) / 1000
      );

      if (shouldRefreshTime <= 0) {
        // Token süresi dolmuşsa
        return { ...token, accessToken: null };
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        email: token.email,
        name: token.name,
        username: token.username,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
