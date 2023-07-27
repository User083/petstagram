import { BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
  return (
    <section className="flex justify-center items-center w-full h-full min-h-screen">
      <BiLoaderAlt className="text-6xl text-primary animate-spin font-bold" />
    </section>
  );
};

export default Loader;
