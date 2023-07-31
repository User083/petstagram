"use client";
import { AiFillHome } from "react-icons/ai";
import { FiPlusSquare, FiCompass } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { signIn, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const MobileBar = () => {
  const [provider, setProviders] = useState<any>(null);
  const { data: session } = useSession();
  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  return (
    <nav className="bottom-0 left-0 fixed m-0 w-full block xl:hidden">
      <div className="flex gap-5 justify-center items-center bg-black text-white">
        <div className="flex justify-center">
          <Link
            href="/"
            className="font-semibold m-3 mt-4 items-center gap-2 "
            aria-label="Home"
          >
            <AiFillHome className="text-3xl" />
          </Link>
        </div>
        <div className="flex  justify-center">
          <Link
            href="/upload"
            className="font-semibold m-3 mt-4 items-center gap-2 "
            aria-label="Upload new post"
          >
            <FiPlusSquare className="text-3xl " />
          </Link>
        </div>
        {session?.user ? (
          <div className="flex ustify-center">
            <div className="items-center gap-3">
              <Link
                href={`/profile/${session?.user._id}`}
                rel="preload"
                className="flex gap-2 m-3 mt-4 items-center"
                aria-label="View Profile"
              >
                <>
                  {" "}
                  <Image
                    className="cursor-pointer rounded-full "
                    src={session.user.image}
                    alt="Profile Picture"
                    width={30}
                    height={30}
                  />
                </>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            {provider && (
              <button
                className="font-semibold m-3 mt-4 items-center gap-2 "
                aria-label="Sign in"
              >
                <FaUserCircle
                  className="text-3xl"
                  onClick={() => signIn(provider.google.id.toString())}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileBar;
