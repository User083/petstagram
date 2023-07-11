import Image from "next/image";
import { cat, horse, dog, bird, snake, hamster, rabbit, fish } from "./icons";

export const topics = [
  {
    name: "dogs",
    icon: <Image src={dog} alt="icon" height={20} width={20} />,
  },
  {
    name: "cats",
    icon: <Image src={cat} alt="icon" height={20} width={20} />,
  },
  {
    name: "birds",
    icon: <Image src={bird} alt="icon" height={20} width={20} />,
  },
  {
    name: "horses",
    icon: <Image src={horse} alt="icon" height={20} width={20} />,
  },
  {
    name: "rabbits",
    icon: <Image src={rabbit} alt="icon" height={20} width={20} />,
  },
  {
    name: "hamsters",
    icon: <Image src={hamster} alt="icon" height={20} width={20} />,
  },
  {
    name: "reptiles",
    icon: <Image src={snake} alt="icon" height={20} width={20} />,
  },
  {
    name: "fish",
    icon: <Image src={fish} alt="icon" height={20} width={20} />,
  },
];
