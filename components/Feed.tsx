"use client";
import { ImageCard, NoResults, Loader } from "@/components";
import { ImagePost } from "@types";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { useRouter } from "next/navigation";

interface IProps {
  posts: ImagePost[];
  handleDelete: Dispatch<SetStateAction<string>>;
}
const PostList = ({ posts, handleDelete }: IProps) => {
  return (
    <section className="flex flex-col">
      {posts.length ? (
        posts.map((post) => (
          <ImageCard key={post._id} post={post} handleDelete={handleDelete} />
        ))
      ) : (
        <NoResults text={"No results found"} />
      )}
    </section>
  );
};

const Feed = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (postId: string) => {
    setLoading(true);
    try {
      await fetch(`/backend/post/${postId}`, {
        method: "DELETE",
      }).then((res) => {
        fetchPosts();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search/${searchText}`);
    }
  };
  const fetchPosts = async () => {
    setLoading(true);
    try {
      await fetch("/backend/post").then(async (res) =>
        setPosts(await res.json())
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col my-5 gap-10 w-full justify-center items-center snap-proximity snap-y">
      {/* <form className="top-10 bg-white flex" onSubmit={handleSearch}>
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
      </form> */}
      {loading ? (
        <Loader />
      ) : (
        <PostList posts={posts} handleDelete={handleDelete} />
      )}
    </section>
  );
};

export default Feed;
