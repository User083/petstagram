import { Feed, Users } from "@/components";

const Home = () => {
  return (
    <section className="flex gap-10 xl:gap-20 w-full">
      <Feed />
      <Users />
    </section>
  );
};

export default Home;
