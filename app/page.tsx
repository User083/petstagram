"use client";
import { ImageCard, Navbar, NoResults, Sidebar } from "@/components";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ImagePost } from "@/types";

interface IProps {
  data: ImagePost[];
}

const Home = ({ data }: IProps) => {
  console.log(data);
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <main className="xl:w-[1200px] m-auto overflow-hidden min-h-screen">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="min-h-screen h-full overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="flex flex-col gap-10 images h-full">
            {/* {data.length ? (
              data.map((post) => <ImageCard key={post._id} post={post} />)
            ) : (
              <NoResults text={"No results found"} />
            )} */}
          </div>
        </div>
      </main>
    </GoogleOAuthProvider>
  );
};

export default Home;
