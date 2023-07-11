"use client";
import { ImageCard, NoResults } from "@/components";
import { ImagePost } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface IProps {
  data: ImagePost[];
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`http://localhost:3000/backend/post`);
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
