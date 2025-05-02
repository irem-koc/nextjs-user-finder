"use server";

import { redirect } from "next/navigation";

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !surname || !email || !password) {
    return { error: "Tüm alanları doldurun." };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, surname, email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return { error: "Kayıt başarısız oldu." };
  }

  redirect("/login");
}
