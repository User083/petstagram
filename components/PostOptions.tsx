"use client";
import { MdDelete } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { ImagePost } from "@types";
import Link from "next/link";

interface IProps {
  handleDelete: () => void;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  userId: string;
  post: ImagePost;
}

const PostOptions = ({
  handleDelete,
  setShowOptions,
  userId,
  post,
}: IProps) => {
  return (
    <section className="absolute bg-black text-white bg-opacity-60 py-2 px-2 z-80 left-0 bottom-0 right-0 top-0 object-cover pointer-events-none  object-cover">
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-[#211C1D] py-2 px-2 rounded-xl flex flex-col gap-3 justify-center font-semibold items-center w-[250px] md:w-[400px] lg:h-[300px] md:h-[300px] lg:w-[300px] h-[300px] ">
          {userId === post.postedBy._id ? (
            <button
              className="py-2 px-2 flex gap-2 items-center border-gray-200 border-b w-full flex justify-center pointer-events-auto text-[#D10000]"
              onClick={() => {
                handleDelete();
                setShowOptions((prev: boolean) => !prev);
              }}
              name="Delete"
              type="button"
              aria-label="Delete"
            >
              <MdDelete className="text-2xl " />
              Delete
            </button>
          ) : (
            <></>
          )}
          <Link
            className="py-2 px-2 flex gap-2 items-center border-gray-200 border-b w-full flex justify-center pointer-events-auto"
            href={`/post/${post._id}`}
            aria-label="Go to post"
          >
            <p>Go to post</p>
          </Link>
          <button
            type="button"
            aria-label="Cancel"
            className="py-2 px-2 flex gap-2 w-full flex items-center justify-center pointer-events-auto"
            onClick={() => {
              setShowOptions((prev: boolean) => !prev);
            }}
            name="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostOptions;
