import UserList from "@/components/UserList";
import { User } from "@/types/User";
import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  return res.json();
}
export default async function Home() {
  const session = await getServerSession();
  const users = await fetchUsers();
  if (!session) {
    return <div>Please log in to see the users.</div>;
  }
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
