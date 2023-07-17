"use client";
import Image from "next/image";
import { logoB } from "@utils/icons";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();
  const [provider, setProviders] = useState<any>(null);
  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };

  const getUsers = async () => {
    const response = await fetch("/backend/users");
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
    fetchProviders();
  }, []);
  return (
    <div className="hidden xl:flex xl:w-[30%] w-full mt-10">
      <div className="flex flex-col gap-5">
        <div>
          {session?.user ? (
            <div className="w-full h-full">
              <div className="xl:flex items-center gap-3 xl:py-3 w-full">
                <Link href="/profile" as={"image"} rel="preload">
                  <Image
                    className="cursor-pointer rounded-full ml-2 xl:ml-0 border-[1px] border-primary"
                    src={session?.user?.image}
                    alt="Profile Picture"
                    width={50}
                    height={50}
                  />
                </Link>
                <p className="text-gray-400 text-sm hidden xl:flex">
                  <span className="text-primary ">{session.user.name}</span>
                </p>
              </div>
            </div>
          ) : (
            <>
              {provider && (
                <div className="px-2 py-4 hidden xl:block">
                  <p className="text-gray-400">Log in to like and comment</p>
                  <div className="pr-4">
                    <button
                      className="bg-primary text-lg text-white border-[1px] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:bg-highlight cursor-pointer
                  "
                      onClick={() => signIn(provider.google.id.toString())}
                    >
                      Log In with {provider.google.id}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="">
          <h1 className="text-sm text-gray-400 font-semibold">
            Suggested for you
          </h1>
          <div className="flex gap-2 py-2">
            {users.map((user) => (
              <Image
                key={user._id}
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
    </div>
  );
};

export default Users;
