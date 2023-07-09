import Image from "next/image";
import { cat, horse, dog, bird } from ".";

export const pets = [
  {
    name: "dogs",
    icon: <Image src={dog} alt="cat" className="h-[20px]" />,
  },
  {
    name: "cats",
    icon: <Image src={cat} alt="cat" className="h-[20px]" />,
  },
  {
    name: "birds",
    icon: <Image src={bird} alt="cat" className="h-[20px]" />,
  },
  {
    name: "horses",
    icon: <Image src={horse} alt="cat" className="h-[20px]" />,
  },
];
