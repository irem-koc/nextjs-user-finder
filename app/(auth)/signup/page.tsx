"use client";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !surname || !email || !password) {
      setError("Tüm alanları doldurun.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        surname,
        email,
        password,
      });
      if (result?.error) {
        setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (err) {
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
      <h1 className="text-xl mb-4">Kayıt Ol</h1>

      <label>Ad</label>
      <input
        type="text"
        placeholder="Ad"
        className="border p-2 mb-2 block"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Soyad</label>
      <input
        type="text"
        placeholder="Soyad"
        className="border p-2 mb-2 block"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 block"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Şifre</label>
      <input
        type="password"
        placeholder="Şifre"
        className="border p-2 mb-2 block"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSignup}
      >
        Kayıt Ol
      </button>
    </div>
  );
}
