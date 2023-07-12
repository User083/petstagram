"use client";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useState, useEffect } from "react";
import SidebarFooter from "./SidebarFooter";
import Discover from "./Discover";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { logoB } from "@utils/icons";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [provider, setProviders] = useState(null);
  const { data: session } = useSession();
  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer fonte-semibold rounded";
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3"
        onClick={() => {
          setShowSidebar((prev) => !prev);
        }}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-between mb-10 border-r-2 xl:border-0 p-3 min-h-screen">
          <div>
            <Link href="/">
              <div className="flex w-full items-center justify-center">
                <>
                  <Image src={logoB} alt="" height={100} width={100} />
                </>
              </div>
            </Link>
            <div className="xl:border-b-2 xl:pb-4">
              <Link href="/">
                <div className={`${normalLink} flex items-center`}>
                  <p className="text-2xl">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block font-semibold">
                    Home
                  </span>
                </div>
              </Link>
            </div>

            {session?.user ? (
              <div className="flex justify-between items-center">
                <div className="py-2 px-2 w-full flex gap-2 items-center flex-wrap">
                  <Link href="/profile">
                    <Image
                      className="cursor-pointer rounded-full"
                      src={session.user.image}
                      alt="Profile Picture"
                      width={37}
                      height={37}
                    />
                  </Link>
                  <p className="text-gray-400 text-sm">
                    <span className="text-primary">{session.user.name}</span>
                  </p>
                </div>
                <Link
                  className="rounded-full border-primary text-primary font-semibold border-[1px] px-2 hover:border-highlight hover:text-highlight xl:flex w-full justify-center hidden"
                  href="/upload"
                >
                  Upload
                </Link>
                <button
                  className="rounded-full border-primary text-primary font-semibold border-[1px] px-2 hover:border-highlight hover:text-highlight xl:flex w-full justify-center hidden"
                  type="button"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign out
                </button>
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
            <Discover />
          </div>
          <SidebarFooter />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
