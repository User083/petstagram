"use client";
import Image from "next/image";
import { logoB } from "@utils/icons";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch("/backend/users");
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="hidden xl:flex xl:w-[30%] w-full mt-10">
      <div className="flex flex-col gap-5">
        <h1 className="title font-bold text-xl">Users</h1>
        <div className="flex gap-2">
          {users.map((user) => (
            <Image
              src={user.profilePicture}
              alt="User"
              width={60}
              height={60}
              className="rounded-full border-[1px] border-gray-200 hover:opacity-50 hover:border-highlight"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
