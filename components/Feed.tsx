"use client";
import { ImageCard, NoResults } from "@/components";
import { ImagePost } from "@types/types";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

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
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {};
  const fetchPosts = async () => {
    const response = await fetch("/backend/post");
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col mt-5 gap-10">
      <form className="w-full px-3 flex gap-3 items-center">
        <IoSearchOutline className="text-3xl text-gray-400" />
        <input
          className="peer ring rounded ring-gray-200 border-gray-200 px-2 py-2 focus:ring-primary focus:border-primary"
          type="text"
          value={searchText}
          placeholder="Search posts"
          onChange={handleSearchChange}
        />
      </form>
      <PostList posts={posts} />
    </section>
  );
};

export default Feed;
