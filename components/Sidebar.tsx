"use client";
import { NextPage } from "next";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
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
        <div className="xl:w-400 w-20 flex flex-co justify-start mb-10 border-r-2 xl:border-0 p-3">
          <div className="xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {!loggedIn && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">Log in to like and comment</p>
              <div className="pr-4">
                <button className="bg-primary text-lg text-white border-[1px] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:bg-highlight cursor-pointer">
                  Log In
                </button>
              </div>
            </div>
          )}
          <SidebarFooter />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
