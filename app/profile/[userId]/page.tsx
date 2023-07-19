"use client";
import { GalleryCard, NoResults } from "@/components";
import { IUser, ImagePost } from "@types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiMoreHorizontal } from "react-icons/fi";

interface IProps {
  data: {
    user: IUser;
    userPosts: ImagePost[];
    userLikedPosts: ImagePost[];
  };
}

const MyProfile = ({ params }: { params: { userId: string } }) => {
  const { data: session } = useSession();
  const [showUserPosts, setShowUserPosts] = useState<Boolean>(true);
  const [postList, setPostList] = useState<ImagePost[]>([]);
  const posts = showUserPosts ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserPosts ? "border-b-2 border-black" : "text-gray-400";
  const [data, setData] = useState<IProps>({
    user: { _id: "", userName: "", profilePicture: "" },
    userPosts: [],
    userLikedPosts: [],
  });

  const getProfile = async (userId: string) => {
    const res = await fetch(`/backend/profile/${userId}`);
    const data = await res.json();
    setData(data);
  };

  const fetchPosts = async () => {
    if (showUserPosts) {
      setPostList(data.userPosts);
    } else {
      setPostList(data.userLikedPosts);
    }
  };

  useEffect(() => {
    getProfile(params.userId);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [showUserPosts, data.userLikedPosts, data.userPosts]);
  return (
    <div className="sm:w-full w-[700px] mt-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full items-center">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              width={120}
              height={120}
              className="rounded-full"
              src={data.user.profilePicture}
              alt="user-profile"
            />
          </div>

          <div>
            <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
              <span>{data.user.userName.replace(/\s+/g, "")} </span>
              <MdVerified className="text-blue-400 md:text-xl text-md" />
            </div>
            <p className="text-sm font-medium"> {data.user.userName}</p>
          </div>
        </div>
        <FiMoreHorizontal />
        {session?.user._id === data.user._id ? (
          <button
            onClick={() => {
              signOut();
            }}
            className="text-sm text-white py-2 px-2 m-3 hover:bg-primary w-[100px] bg-gray-200 rounded"
          >
            Sign out
          </button>
        ) : (
          <></>
        )}
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${posts} mt-2`}
            onClick={() => setShowUserPosts(true)}
          >
            Posts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserPosts(false)}
          >
            Liked
          </p>
        </div>
      </div>
      <div className="flex">
        {postList?.length > 0 ? (
          postList.map((post: ImagePost, idx: number) => (
            <Link href={`/post/${post._id}`}>
              <GalleryCard key={idx} post={post} />
            </Link>
          ))
        ) : (
          <NoResults text={`No ${showUserPosts ? "" : "Liked"} Posts Yet`} />
        )}
      </div>
    </div>
  );
};

export default MyProfile;
