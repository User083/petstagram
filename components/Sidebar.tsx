"use client";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { FiPlusSquare, FiCompass, FiMenu } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { useState, useEffect } from "react";
import SidebarFooter from "./SidebarFooter";
import Discover from "./Discover";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { logoB } from "@utils/icons";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [provider, setProviders] = useState<any>(null);
  const { data: session } = useSession();
  const fetchProviders = async () => {
    try {
      setProviders(await getProviders());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <aside className="hidden xl:block my-5 mb-20">
      <div className="xl:w-[400px] flex flex-col justify-between mb-10 border-r-2 p-3 px-10">
        <nav>
          <Link href="/" aria-label="Home logo">
            <div className="flex items-center py-1 pb-3 m-3">
              <Image
                src={logoB}
                alt="Logo"
                height={100}
                width={100}
                priority={false}
              />
            </div>
          </Link>
          <div className="w-full flex xl:justify-start justify-center  hover:bg-gray-200 rounded-xl">
            <Link
              href="/"
              className="font-semibold m-3 mt-4 hidden xl:flex items-center gap-2 "
              aria-label="Home"
            >
              <AiFillHome className="text-3xl" />
              Home
            </Link>
          </div>

          <div className=" w-full flex xl:justify-start justify-center hover:bg-gray-200 rounded-xl">
            <Link
              aria-label="Upload"
              href="/upload"
              className="font-semibold m-3 mt-4 hidden xl:flex items-center gap-2 "
            >
              <FiPlusSquare className="text-3xl " />
              Create
            </Link>
          </div>
          {/* <Discover /> */}
          {session?.user ? (
            <div className="w-full flex xl:justify-start justify-center  hover:bg-gray-200 rounded-xl">
              <div className="xl:flex items-center gap-3">
                <Link
                  aria-label="View profile"
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
                <span className="px-2 py-4 hidden xl:block">
                  <p className="text-gray-400">Log in to like and comment</p>
                  <div className="pr-4">
                    <button
                      name="Log in with Google"
                      className="bg-primary text-lg text-white border-[1px] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:bg-highlight cursor-pointer
                  "
                      onClick={() => signIn(provider.google.id.toString())}
                    >
                      Log In with {provider.google.id}
                    </button>
                  </div>
                </span>
              )}
            </>
          )}
        </nav>
        <section className="relative mt-20">
          <button
            className="w-full flex xl:justify-start justify-center rounded-xl cursor-default "
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            <p className="font-semibold m-3 mt-4 hidden xl:flex items-center gap-2 hover:text-primary cursor-pointer">
              <FiMenu className="text-3xl" />
              More
            </p>
          </button>

          <SidebarFooter />
          {showMenu ? (
            <div className="py-2 px-2 flex flex-col rounded-xl bg-[#211C1D] absolute  right-0 top-0 max-w-[200px] max-h-[200px]">
              <>
                {session?.user._id ? (
                  <>
                    <button
                      name="Sign out"
                      onClick={() => {
                        signOut();
                      }}
                      className="text-sm text-white py-2 px-2"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </>
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
