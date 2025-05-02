"use client";
import { signIn, useSession } from "next-auth/react";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.error) {
        setError(result?.error.toString());
      } else {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      setError(err.toString());
    }
  };
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h2>Zaten giriş yaptınız!</h2>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 block"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 block"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer"
        onClick={handleLogin}
      >
        Giriş Yap
      </button>
      <div className="flex space-x-2 my-3">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-amber-400 p-2 rounded-xl cursor-pointer"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="bg-indigo-600 p-2 rounded-xl text-white cursor-pointer"
        >
          Sign in with Github
        </button>
      </div>
    </div>
  );
}
