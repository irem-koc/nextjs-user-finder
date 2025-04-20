"use client";

import { User } from "@/types/User";
import { useState } from "react";
import Input from "./Input";

type Props = {
  users: User[];
};

const UserList = ({ users }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredUsers.length > 0 ? (
        <table className="table-auto w-full mt-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>There is no data</div>
      )}
    </div>
  );
};

export default UserList;
