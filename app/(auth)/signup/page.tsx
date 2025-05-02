import { registerUser } from "@/app/actions/auth";

export default function SignupPage() {
  console.log("SignupPage");
  return (
    <form action={registerUser} className="p-4">
      <h1 className="text-xl mb-4">Kayıt Ol</h1>

      <label>Ad</label>
      <input type="text" name="name" className="border p-2 mb-2 block" />

      <label>Soyad</label>
      <input type="text" name="surname" className="border p-2 mb-2 block" />

      <label>Email</label>
      <input type="email" name="email" className="border p-2 mb-2 block" />

      <label>Şifre</label>
      <input
        type="password"
        name="password"
        className="border p-2 mb-2 block"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Kayıt Ol
      </button>
    </form>
  );
}
