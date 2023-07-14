"use client";
import Image from "next/image";
import Link from "next/link";
import NoResults from "./NoResults";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  _createdAt: string;
  postedBy: { _ref: string; _id: string };
}

interface IUser {
  _id: string;
  userName: string;
  profilePicture: string;
}

const CommentCard = ({ comment, postedBy, _createdAt }: IComment) => {
  const [poster, setPoster] = useState<IUser>();
  const findUser = async (id: string) => {
    const response = await fetch(`/backend/users/${id}`);
    const data = await response.json();
    setPoster(data[0]);
  };
  useEffect(() => {
    findUser(postedBy._id);
  }, []);

  return (
    <div className="px-1 py-1 flex flex-col">
      <div className="flex gap-2 items-center">
        <Image
          src={poster?.profilePicture}
          alt="Profile picture"
          height={30}
          width={30}
          className="rounded-full"
        />

        <p className="mt-1 text-sm">
          <span className="font-semibold text-medium">{poster?.userName}</span>{" "}
          {comment}
        </p>
      </div>
      <p className="text-xs text-gray-400 ml-10">posted {"1 day"} ago</p>
    </div>
  );
};

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { data: session } = useSession();

  return (
    <div className="border-t-2 border-gray-200 pt-4 pb-[100px]">
      <div className="">
        {comments?.length ? (
          <div>
            {comments.map((com) => (
              <CommentCard
                key={com._key}
                _key={com._key}
                comment={com.comment}
                postedBy={com.postedBy}
                _createdAt={com._createdAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-md text-gray-400 p-2">No comments yet</p>
        )}
      </div>
      {session?.user?._id && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 border-t">
          <form className="flex gap-4" onSubmit={addComment}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="px-6 py-4 text-md font-medium w-[250px] md:w-[700px] flex-1 lg:w-[350px] focus:outline-none"
            />
            <button
              className="text-sm font-semibold text-gray-500 hover:text-primary"
              onClick={addComment}
            >
              {isPostingComment ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
