"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import { ImagePost } from "@types";
import { Comments, Like, Loader } from "@components";
import { useSession } from "next-auth/react";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Details = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<ImagePost>();
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await fetch(`/backend/post/${params.id}`).then(
        async (res) => await res.json()
      );
      setPost(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params.id);
  }, []);

  useEffect(() => {
    setLikes(post?.likes.length);
  }, [post]);

  const handleLike = async (like: boolean) => {
    if (session?.user._id) {
      try {
        const likeData = {
          userId: session.user._id,
          postId: post?._id,
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
          postId: post?._id,
          comment,
        };

        await fetch(`/backend/post/${post?._id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(commentData),
        }).then(async (res) => {
          const data = await res.json();
          setPost({ ...post, comments: data.comments });
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
    <>
      {isLoading && <Loader />}
      {post && !isLoading && (
        <article className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap h-full min-h-screen">
          <section className="relative flex-2 w-full lg:w-9/12 flex justify-center items-center bg-black">
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <button
                className="cursor-pointer "
                onClick={() => router.back()}
                name="Cancel"
              >
                <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
              </button>
            </div>

            <div className="relative lg:h-[100vh] h-[80vh] w-[300px] md:w-[900px] lg:w-[1200px]">
              <Image
                alt={post.caption}
                src={post?.image?.asset.url}
                style={{ objectFit: "contain" }}
                fill={true}
                priority={true}
              />
            </div>
          </section>
          <section className="relative w-[1000px] md:w-[900px] lg:w-[600px]">
            <div className="lg:mt-20 mt-10">
              <Link
                href={`/profile/${post.postedBy._id}`}
                aria-label="View User Profile"
              >
                <span className="flex gap-4 mb-4 w-full pl-10">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={post.postedBy.profilePicture}
                    priority={false}
                  />
                  <div>
                    <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                      {post.postedBy.userName.replace(/\s+/g, "")}{" "}
                      <MdVerified className="text-blue-400 text-xl" />
                    </div>
                    <p className="text-md"> {post.postedBy.userName}</p>
                  </div>
                </span>
              </Link>

              <div className="px-10">
                <p className=" text-md text-gray-600">{post.caption}</p>
              </div>
              <div className="mt-5 px-10">
                {session?.user._id && (
                  <span className="flex gap-2 items-center">
                    <Like
                      likes={post.likes}
                      setLikes={setLikes}
                      handleLike={() => handleLike(true)}
                      handleDislike={() => handleLike(false)}
                    />
                    <p className="text-sm font-semibold">{likes} likes</p>
                  </span>
                )}
                <section className="mt-2">
                  <Comments
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    comments={post.comments}
                    isPostingComment={isPostingComment}
                  />
                </section>
              </div>
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default Details;
