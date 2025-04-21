import UserList from "@/components/UserList";
import { User } from "@/types/User";
export const dynamic = "force-dynamic";
async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  return res.json();
}
export default async function Home() {
  const users = await fetchUsers();
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
