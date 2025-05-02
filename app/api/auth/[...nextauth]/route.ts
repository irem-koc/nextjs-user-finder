import axios from "axios";
import * as https from "https";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const newCre = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const user = await axios.post("/auth/login", newCre, {
            httpsAgent,
            baseURL: process.env.NEXT_PUBLIC_API_URL,
          });

          if (user?.data.token) {
            return user.data;
          } else {
            throw new Error("Geçersiz giriş bilgileri");
          }
        } catch (error: unknown) {
          console.log(error, "error");
          if (error instanceof Error) {
            throw new Error(error.message || "Bir hata oluştu");
          } else {
            throw new Error("Bir hata oluştu");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }) {
      console.log(profile, "profile", account, "account");
      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth-login`,
            {
              email: profile?.email,
              name: profile?.given_name,
              surname: profile?.family_name,
              provider: "google",
              providerId: profile?.sub,
            },
            { httpsAgent }
          );

          const data = response.data;

          token.accessToken = data.token;
          token.email = data.email;
          token.name = data.name;
          token.surname = data.surname;
          token.userId = data.userId;
          token.accessTokenExpiry = Date.now() + 15 * 60 * 1000;
        } catch (err) {
          console.error("OAuth login kayıt hatası:", err);
          throw new Error("Google kullanıcı kaydı başarısız.");
        }
      }

      if (user && account?.provider === "credentials") {
        token.accessToken = user.token;
        token.email = user.email;
        token.name = user.name;
        token.surname = user.surname;
        token.userId = user.userId;
        token.accessTokenExpiry = Date.now() + 15 * 60 * 1000;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email as string,
        name: token.name as string,
        surname: token.surname as string,
        userId: token.userId as string,
        accessToken: token.accessToken as string | null,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const { GET, POST } = handler;
