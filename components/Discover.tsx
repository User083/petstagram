"use client";
import Link from "next/link";
import { pets } from "@/utils/constants";
import { useSearchParams } from "next/navigation";

const Discover = () => {
  const searhParams = useSearchParams();

  const activePetStyle =
    "xl:border-2 hover:bg-primary xl:border-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-secondary";
  const petStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Pets
      </p>
      <div className="flex gap-3 flex-wrap">
        {pets.map((petType) => (
          <Link href={`/?pet=${petType.name}`} key={petType.name}>
            <div
              className={
                searhParams.get("pet") === petType.name
                  ? activePetStyle
                  : petStyle
              }
            >
              <span className="font-bold text-2xl xl:text-md h-[20px] w-[20px]">
                {petType.icon}
              </span>
              <span
                className={`font-medium text-md hidden xl:block capitalize`}
              >
                {petType.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
