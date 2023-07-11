"use client";
import Link from "next/link";
import Image from "next/image";
import { cat } from "@/utils/icons";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [provider, setProviders] = useState(null);
  const { data: session } = useSession();
  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  return (
    <nav className="w-full flex justify-between items-center border-b-2 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={cat}
            alt="Logo"
            width={37}
            height={37}
          />
        </div>
      </Link>
      {session?.user ? (
        <>
          <Link href="/profile">
            <Image
              className="cursor-pointer rounded-full"
              src={session?.user.image}
              alt="Profile Picture"
              width={37}
              height={37}
            />
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          {provider && (
            <button
              type="button"
              onClick={() => signIn(provider.google.id.toString())}
              className="py-2 px-2"
            >
              Sign In with {provider.google.id}
            </button>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
