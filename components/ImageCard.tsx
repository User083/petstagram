"use client";

import Image from "next/image";
import Link from "next/link";
import { ImagePost } from "@types";
import { MdVerified } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { topics } from "@utils/constants";
import Comments from "./Comments";
import Like from "./Like";
import { useSession } from "next-auth/react";
import { FiMoreHorizontal } from "react-icons/fi";
import PostOptions from "./PostOptions";

interface IProps {
  post: ImagePost;
  handleDelete: Dispatch<SetStateAction<string>>;
}

function DisplayTime(systemTime: string) {
  let time = systemTime.slice(11, 16);
  return time;
}

function DisplayDate(systemTime: string) {
  let rawDate = systemTime.slice(0, 10);
  let dateArr = rawDate.split("-");

  let date = dateArr.reverse().toString().replace(/,/g, "-");
  return date;
}

const ImageCard = ({ post, handleDelete }: IProps) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes.length);
  const [viewComments, setViewComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);

  const handleLike = async (like: boolean) => {
    if (session?.user._id) {
      try {
        const likeData = {
          userId: session.user._id,
          postId: post._id,
          like,
        };

        await fetch("/backend/like", {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(likeData),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    if (session?.user._id && comment) {
      setIsPostingComment(true);
      try {
        const commentData = {
          userId: session.user._id,
          postId: post._id,
          comment,
        };

        await fetch(`/backend/post/${post._id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(commentData),
        }).then(async (res) => {
          const data = await res.json();
          setCurrentPost({ ...post, comments: data.comments });
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsPostingComment(false);
        setComment("");
      }
    }
  };

  return (
    <article className="flex flex-col border-b-2 pb-2 border-gray-200 w-full md:w-[600px] lg:w-[700px] relative md:min-h-fit h-full snap-center  ">
      <section>
        <span className="flex justify-between items-center md:pr-0 px-5 my-2">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center">
            <Link
              href={`/profile/${post.postedBy._id}`}
              prefetch={false}
              as={`/profile/${post.postedBy._id}`}
              aria-label="View poster profile"
            >
              <div className="md:w-16 md:h-16 w-10 h-10">
                <>
                  <Image
                    src={post.postedBy.profilePicture}
                    alt="Profile Photo"
                    width={60}
                    height={60}
                    objectFit="contain"
                    className="rounded-full"
                  />
                </>
              </div>
            </Link>
            <div>
              <Link href="/" aria-label="View poster profile">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <p className="flex items-center md:text-md font-bold text-primary">
                      <span>{post.postedBy.userName.replace(/\s+/g, "")} </span>
                    </p>
                    <MdVerified className="text-blue-400 text-md" />
                  </div>

                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    •{" "}
                    {" " +
                      DisplayDate(post._createdAt) +
                      " " +
                      "•" +
                      " " +
                      DisplayTime(post._createdAt)}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="">
            {" "}
            <FiMoreHorizontal
              className="cursor-pointer hover:text-primary text-xl"
              onClick={() => {
                setShowOptions((prev) => !prev);
              }}
            />
          </div>
        </span>
      </section>

      <section className="flex lg:ml-20 h-full w-full">
        <div className="rounded-3xl ">
          <Link
            href={`/post/${post._id}`}
            as={`/post/${post._id}`}
            className={
              showOptions
                ? `relative pointer-events-none `
                : `relative pointer-events-auto`
            }
            prefetch={false}
            aria-label="View post details"
          >
            <div className="bg-gray-100 cursor-pointer rounded w-screen md:w-[600px] lg:h-[800px] md:h-[800px] lg:w-[600px] h-[65vh] relative">
              <Image
                src={post.image.asset.url}
                alt="Image Post"
                fill
                objectFit="cover"
                priority={true}
              />
            </div>
          </Link>{" "}
          {showOptions ? (
            <PostOptions
              handleDelete={() => handleDelete(post._id)}
              setShowOptions={setShowOptions}
              post={post}
              userId={session?.user._id}
            />
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="flex justify-between h-full w-full px-5">
        <div className="flex flex-col gap-1 py-2">
          <div className="flex gap-2 py-2">
            <Like
              likes={post.likes}
              setLikes={setLikes}
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />
            <Link href={`/post/${post._id}`} aria-label="Comment on post">
              <IoChatbubbleOutline className="hover:text-gray-400 cursor-pointer text-2xl" />
            </Link>
          </div>
          <p className="font-semibold px-2 text-sm">{likes} likes</p>
          <span>
            <p className=" px-2 text-sm text-ellipsis">
              <span className="font-semibold">
                {post.postedBy.userName.replace(/\s+/g, "")}{" "}
              </span>{" "}
              {post.caption}
            </p>
          </span>

          {viewComments ? (
            <Comments
              isPostingComment={isPostingComment}
              addComment={addComment}
              comment={comment}
              setComment={setComment}
              comments={currentPost.comments}
            />
          ) : (
            <>
              {" "}
              {post.comments.length > 0 ? (
                <Link
                  href={`/post/${post._id}`}
                  className="flex px-2 py-1"
                  aria-label="View all comments"
                >
                  <p className="text-sm text-gray-400">
                    View all {post.comments.length} comments
                  </p>{" "}
                </Link>
              ) : (
                <p className=" px-2 py-1 text-sm text-gray-400">
                  No comments yet
                </p>
              )}
            </>
          )}
        </div>
        <div>
          {topics.map((topic) =>
            topic.name === post.topic ? (
              <Link
                aria-label={`Sort by ${topic.name}`}
                href={`/search/${topic.name}`}
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
      </section>
    </article>
  );
};
export default ImageCard;
