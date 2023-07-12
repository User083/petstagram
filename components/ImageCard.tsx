"use client";

import Image from "next/image";
import Link from "next/link";
import { ImagePost } from "@types/types";
import { MdVerified } from "react-icons/md";
import { IoHeartOutline, IoHeart, IoChatbubbleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { topics } from "@utils/constants";

interface IProps {
  post: ImagePost;
}

const ImageCard = ({ post }: IProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<any[] | null>([]);

  useEffect(() => {
    if (post.comments != null) {
      setComments(post.comments.length);
    }
    if (post.likes != null) {
      setLikes(post.likes.length);
    }
  }, []);
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/profile">
              <>
                <Image
                  src={post.postedBy.profilePicture}
                  alt="Profile Photo"
                  width={60}
                  height={60}
                  className="object-contain rounded-full"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <p className="flex items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                  </p>
                  <MdVerified className="text-blue-400 text-md" />
                </div>

                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post._createdAt}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl">
          <Link href="/">
            <>
              <Image
                src={post.image.asset.url}
                alt="Image Post"
                width={600}
                height={600}
                className="bg-gray-100 cursor-pointer rounded w-[250px] md:w-[400px] lg:h-[800px] md:h-[600px] lg:w-[600px] h-[300px] object-cover"
              />
            </>
          </Link>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 px-2 py-2">
              <div className="flex gap-2 py-2">
                {liked ? (
                  <IoHeart
                    className="text-primary cursor-pointer text-2xl"
                    onClick={() => {
                      setLiked((prev) => !prev);
                      setLikes((prev) => prev - 1);
                    }}
                  />
                ) : (
                  <IoHeartOutline
                    className="hover:text-primary cursor-pointer text-2xl"
                    onClick={() => {
                      setLiked((prev) => !prev);
                      setLikes((prev) => prev + 1);
                    }}
                  />
                )}

                <IoChatbubbleOutline
                  className="hover:text-gray-400 cursor-pointer text-2xl"
                  onClick={() => {}}
                />
              </div>
              <p className="font-semibold px-2 text-sm">{likes} likes</p>
              <p className=" px-2 text-sm">
                <span className="font-semibold">{post.postedBy.userName}</span>{" "}
                {post.caption}
              </p>
              {comments.length > 0 ? (
                <button className="flex px-2 py-1">
                  {" "}
                  <p className="text-sm text-gray-400">
                    View all {comments.length} comments
                  </p>
                </button>
              ) : (
                <p className=" px-2 py-1 text-sm text-gray-400">
                  No comments yet
                </p>
              )}
            </div>
            <div>
              {topics.map((topic) =>
                topic.name === post.topic ? (
                  <Link
                    href={`/?${topic.name}`}
                    key={topic.name}
                    className=" group"
                  >
                    <p className="text-3xl py-4 px-2 hover:text-primary">
                      {topic.icon}
                    </p>
                    <p className="group-hover:flex hidden text-gray-400 text-xs items-center justify-center border-gray-200 rounded border-[1px]">
                      {topic.name}
                    </p>
                  </Link>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
