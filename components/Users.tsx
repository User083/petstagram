"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import Loader from "./Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const getUsers = async () => {
    setIsLoading(true);
    try {
      await fetch("/backend/users").then(async (res) =>
        setUsers(await res.json())
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <aside className="hidden xl:flex m-10 min-w-[400px]">
      {isLoading && <Loader />}
      <div className="flex flex-col gap-5">
        {!isLoading && (
          <>
            <section>
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
            </section>
            <section className="w-full">
              <h1 className="text-sm text-gray-400 font-semibold">
                Suggested for you
              </h1>
              <div className="flex gap-2 py-2 flex-col">
                {users.map((user) => (
                  <Link
                    href={`/profile/${user._id}`}
                    className="flex gap-1 items-center"
                  >
                    <>
                      <Image
                        key={user._id}
                        src={user.profilePicture}
                        alt="User"
                        width={52}
                        height={52}
                        className="rounded-full border-[1px] border-gray-200 hover:opacity-50 hover:border-highlight hover:cursor-pointer"
                      />
                    </>
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm flex gap-1 items-center">
                        {user.userName}{" "}
                        <MdVerified className="text-blue-400 text-md" />
                      </p>
                      <p className="text-sm text-gray-400">
                        Followed by jimmyhendrix
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </aside>
  );
};

export default Users;
