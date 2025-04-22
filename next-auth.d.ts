import "next-auth";

// Extending the default session type
declare module "next-auth" {
  interface Session {
    accessToken: string | null;
    user: {
      name: string;
      email: string;
      surname: string;
      userId: string;
      accessToken: string | null;
    };
  }

  interface User {
    email: string;
    name: string;
    surname: string;
    userId: string;
    token: string;
    accessTokenExpiry: number;
  }

  interface JWT {
    accessToken: string | null; // Allow accessToken to be string or null
    accessTokenExpiry: number;
    email: string;
    name: string;
    surname: string;
    userId: string;
  }
}
