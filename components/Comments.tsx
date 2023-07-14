"use client";
import Image from "next/image";
import Link from "next/link";
import NoResults from "./NoResults";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

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
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { data: session } = useSession();

  return (
    <div className="border-t-2 border-gray-200 pt-4 border-b-2 pb-[100px]">
      <div className="">
        {comments?.length ? <div></div> : <NoResults text="No comments yet" />}
      </div>
      {session?.user?._id && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form className="flex gap-4" onSubmit={addComment}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value.trim())}
              placeholder="Add comment"
              className="px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] flex-1 rounded border-gray-100 lg:w-[350px] focus:border-2 focus:outline-none"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
