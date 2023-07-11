import { Navbar, Feed, Sidebar } from "@/components";

const Home = () => {
  return (
    <main className="xl:w-[1200px] m-auto overflow-hidden min-h-screen">
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="min-h-screen h-full overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-10 images h-full">
          <Feed />
        </div>
      </div>
    </main>
  );
};

export default Home;
