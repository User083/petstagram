"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Profile } from "@/components";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = async (params: type) => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/backend/users/${session?.user.id}/post`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);
  return (
    <div>
      <Profile
        name={session?.user.name}
        desc=""
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
