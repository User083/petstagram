import Image from "next/image";
import { cat, horse, dog, bird, hamster, fish, snake, rabbit } from "./icons";

export const topics = [
  {
    name: "dogs",
    icon: <Image src={dog} alt="icon" width={20} height={20} />,
  },
  {
    name: "cats",
    icon: <Image src={cat} alt="icon" width={20} height={20} />,
  },
  {
    name: "birds",
    icon: <Image src={bird} alt="icon" width={20} height={20} />,
  },
  {
    name: "horses",
    icon: <Image src={horse} alt="icon" width={20} height={20} />,
  },
  {
    name: "hamsters",
    icon: <Image src={hamster} alt="icon" width={20} height={20} />,
  },
  {
    name: "rabbits",
    icon: <Image src={rabbit} alt="icon" width={20} height={20} />,
  },
  {
    name: "fish",
    icon: <Image src={fish} alt="icon" width={20} height={20} />,
  },
  {
    name: "reptiles",
    icon: <Image src={snake} alt="icon" width={20} height={20} />,
  },
];
