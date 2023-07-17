"use client";
import Link from "next/link";
import { topics } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { FiCompass } from "react-icons/fi";
import { useState } from "react";

const Discover = () => {
  const searhParams = useSearchParams();
  const [showOptions, setShowOptions] = useState(true);

  const activePetStyle =
    "xl:border-2 xl:border-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-primary";
  const petStyle =
    "xl:border-2 hover:bg-primary hover:text-white hover:border-white xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className="">
      <div className="flex justify-center xl:justify-start hover:bg-gray-200 rounded-xl">
        <button
          onClick={() => {
            setShowOptions((prev) => !prev);
          }}
        >
          <p className="font-semibold m-3 mt-4 hidden xl:flex items-center gap-2">
            <FiCompass className="text-3xl" />
            Explore
          </p>

          <FiCompass className="block text-3xl xl:hidden hover:text-primary m-3" />
        </button>
      </div>
      {showOptions ? (
        <div className="flex gap-3 flex-wrap mt-2">
          {topics.map((topic) => (
            <Link href={`/?topic=${topic.name}`} key={topic.name}>
              <div
                className={
                  searhParams.get("topic") === topic.name
                    ? activePetStyle
                    : petStyle
                }
              >
                <span className="font-bold text-2xl xl:text-md h-[20px] w-[20px]">
                  {topic.icon}
                </span>
                <span
                  className={`font-medium text-md hidden xl:block capitalize`}
                >
                  {topic.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Discover;
