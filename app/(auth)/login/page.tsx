"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    if (res?.error) {
      alert("Hatalı giriş bilgileri");
    }
  };
  const { data } = useSession();
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <label htmlFor="">Email</label>
      <input
        type="text"
        placeholder="Email"
        className="border p-2 mb-2 block"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 block"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Giriş Yap
      </button>
    </div>
  );
}
