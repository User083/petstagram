import { BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
  return (
    <section className="flex justify-center items-center w-full h-full min-h-screen">
      <BiLoaderAlt className="text-2xl text-primary animate-spin" />
    </section>
  );
};

export default Loader;
