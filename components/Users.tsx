"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();

  const getUsers = async () => {
    const response = await fetch("/backend/users");
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="hidden xl:flex m-10">
      <div className="flex flex-col gap-5">
        <div>
          {session?.user ? (
            <div className="w-full h-full">
              <div className="xl:flex items-center gap-3 xl:py-3 w-full">
                <Link
                  href={`/profile/${session?.user._id}`}
                  rel="preload"
                  className="w-[50px] h-auto"
                >
                  <>
                    {" "}
                    <Image
                      className="cursor-pointer rounded-full ml-2 xl:ml-0 border-[1px] border-primary"
                      src={session?.user?.image}
                      alt="Profile Picture"
                      width={50}
                      height={50}
                    />
                  </>
                </Link>
                <p className="text-gray-400 text-sm hidden xl:flex">
                  <span>{session?.user.name.replace(/\s+/g, "")} </span>
                </p>
                <MdVerified className="text-blue-400 text-md" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full">
          <h1 className="text-sm text-gray-400 font-semibold">
            Suggested for you
          </h1>
          <div className="flex gap-2 py-2">
            {users.map((user) => (
              <Link href={`/profile/${user._id}`}>
                <>
                  <Image
                    key={user._id}
                    src={user.profilePicture}
                    alt="User"
                    width={60}
                    height={60}
                    className="rounded-full border-[1px] border-gray-200 hover:opacity-50 hover:border-highlight hover:cursor-pointer"
                  />
                </>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
