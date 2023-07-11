"use client";
import { ImagePost } from "@/types";
import { NoResults, ImageCard } from "@/components";
import { useEffect, useState } from "react";

interface IProps {
  data: ImagePost[];
}

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/backend/posts");

      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

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

export default Feed;
