"use client";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { FiPlusSquare, FiCompass } from "react-icons/fi";
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
  const [showOptions, setShowOptions] = useState(false);
  const { data: session } = useSession();
  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded ";
  return (
    <div className="relative">
      <div
        className="block xl:hidden m-5 ml-20"
        onClick={() => {
          setShowSidebar((prev) => !prev);
        }}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-[400px] flex flex-col justify-between mb-10 border-r-2 xl:border-0 p-3 min-h-screen ml-10 pl-10">
          <div>
            <Link href="/" rel="preload">
              <div className="flex items-center justify-center py-1 pb-3 ">
                <Image
                  src={logoB}
                  alt="Logo"
                  height={100}
                  width={100}
                  priority
                />
              </div>
            </Link>
            <div className="w-full flex xl:justify-start justify-center  hover:bg-gray-200 rounded-xl">
              <Link
                href="/"
                className="font-semibold m-3 mt-4 hidden xl:flex items-center gap-2 "
              >
                <AiFillHome className="text-3xl" />
                Home
              </Link>
            </div>

            <div className=" w-full flex xl:justify-start justify-center hover:bg-gray-200 rounded-xl">
              <Link
                href="/upload"
                className="font-semibold m-3 mt-4 hidden xl:flex items-center gap-2 "
              >
                <FiPlusSquare className="text-3xl " />
                Create
              </Link>
              <Link
                href="/upload"
                className="font-bold text-3xl xl:text-md block xl:hidden"
              >
                <FiPlusSquare className="hover:text-primary m-3 mt-4" />
              </Link>
            </div>
            <Discover />
            {session?.user ? (
              <div className="w-full flex xl:justify-start justify-center  hover:bg-gray-200 rounded-xl">
                <div className="xl:flex items-center gap-3">
                  <Link
                    href={`/profile/${session?.user._id}`}
                    rel="preload"
                    className="flex gap-2 m-3 mt-4 items-center"
                  >
                    <>
                      {" "}
                      <Image
                        className="cursor-pointer rounded-full "
                        src={session?.user?.image || ""}
                        alt="Profile Picture"
                        width={30}
                        height={30}
                      />
                    </>{" "}
                    <p className=" hidden xl:flex">
                      <span className="font-semibold ">Profile</span>
                    </p>
                  </Link>
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
          <SidebarFooter />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
