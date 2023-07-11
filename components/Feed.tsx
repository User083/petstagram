"use client";
import { ImageCard, NoResults } from "@/components";
import { ImagePost } from "@types/types";
import { useEffect, useState } from "react";

const PostList = ({ posts }) => {
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

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/backend/post");
      const data = await response.json();
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col mt-5 gap-10">
      <form className="relative w-full flex-center">
        <input
          className="peer"
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
