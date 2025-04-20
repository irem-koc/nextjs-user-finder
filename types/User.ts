export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editör" | "Kullanıcı";
  registeredAt: string;
}
