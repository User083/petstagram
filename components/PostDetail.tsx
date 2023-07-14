"use client";
import { useRef, useState } from "react";
import { ImagePost } from "@types";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";

interface IProps {
  postDetails: ImagePost;
}

const PostDetail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);

  const imageRef = useRef(null);
  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <Image
              src={post.image.asset.url}
              alt="Post Image"
              className="h-full w-full"
              ref={imageRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
