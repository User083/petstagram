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
  const [provider, setProviders] = useState<any>(null);
  const { data: session } = useSession();
  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
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
              <div className="flex w-full items-center justify-center py-1">
                <>
                  <Image src={logoB} alt="Logo" height={100} width={100} />
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
              <div className="">
                <div className="xl:flex items-center gap-3 xl:py-3">
                  <Link href="/profile">
                    <Image
                      className="cursor-pointer rounded-full ml-2 xl:ml-0 border-[1px] border-primary"
                      src={session?.user?.image}
                      alt="Profile Picture"
                      width={37}
                      height={37}
                    />
                  </Link>
                  <p className="text-gray-400 text-sm hidden xl:flex">
                    <span className="text-primary ">{session.user.name}</span>
                  </p>
                </div>
                <div className="flex gap-3 w-full">
                  <Link
                    className="rounded-full bg-primary border-white text-white font-semibold border-[1px] px-2 hover:border-primary hover:bg-white hover:text-primary xl:flex w-full justify-center hidden"
                    href="/upload"
                  >
                    Upload
                  </Link>
                  <button
                    className="rounded-full border-gray-400 text-gray-400 text-sm border-[1px] px-2 hover:border-primary hover:text-primary xl:flex w-full justify-center items-center hidden"
                    type="button"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </button>
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
            <Discover />
          </div>
          <SidebarFooter />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
