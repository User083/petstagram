"use client";
import Link from "next/link";
import Image from "next/image";
import { cat, createOrGetUser } from "@/utils";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "@/store/authStore";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  return (
    <nav className="w-full flex justify-between items-center border-b-2 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] h-[38px]">
          <Image
            className="cursor-pointer h-[20px] w-[20px]"
            src={cat}
            alt="Logo"
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div className="">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Post</span>
              </button>
            </Link>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => {
              console.log("Unable to login");
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
