"use client";
import { ImageCard, NoResults } from "@/components";
import { ImagePost } from "@types";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface IProps {
  posts: ImagePost[];
}
const PostList = ({ posts }: IProps) => {
  return (
    <div className="flex flex-col gap-10 h-full images">
      {posts.length ? (
        posts.map((post) => <ImageCard key={post._id} post={post} />)
      ) : (
        <NoResults text={"No results found"} />
      )}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search/${searchText}`);
    }
  };
  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch("/backend/post");
    await response
      .json()
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col mt-5 gap-10 w-full ">
      <form className="top-10 bg-white flex" onSubmit={handleSearch}>
        <input
          className=" relative md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-primary focus:border-2 rounded-full md:top-0 w-[300px] md:w-[350px] p-3 focus:ring-primary"
          type="text"
          value={searchText}
          placeholder="Search posts"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="md:right-5 right-6 border-gray-300 top-4 pl-4 text-2xl text-gray-400 hover:text-primary"
        >
          <IoSearchOutline />
        </button>
      </form>
      {loading ? (
        <p className="animate-pulse  title">
          <BiLoaderAlt className="animate-spin text-6xl text-primary" />
        </p>
      ) : (
        <PostList posts={posts} />
      )}
    </section>
  );
};

export default Feed;
