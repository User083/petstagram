"use client";
import { ImageCard, NoResults } from "@/components";
import { ImagePost } from "@types/types";
import { useEffect, useState } from "react";

const PostList = ({ posts }) => {
  return (
    <div>
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
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
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
