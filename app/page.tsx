import { Feed, Users } from "@/components";

const Home = () => {
  return (
    <article className="flex gap-10 xl:gap-20 w-full">
      <Feed />
      <Users />
    </article>
  );
};

export default Home;
