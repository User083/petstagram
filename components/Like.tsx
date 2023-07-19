"use client";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  setLikes: Dispatch<SetStateAction<number>>;
  likes: any[];
}

const Like = ({ handleDislike, handleLike, likes, setLikes }: IProps) => {
  const [liked, setLiked] = useState<boolean>();
  const [like, setLike] = useState(false);

  const { data: session } = useSession();
  const filterLikes = likes?.filter((item) => item._ref === session?.user._id);
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true);
      setLike(true);
    } else {
      setLiked(false);
      setLike(false);
    }
  }, []);
  return (
    <>
      <button>
        {liked ? (
          <IoHeart
            className="text-primary cursor-pointer text-2xl"
            onClick={() => {
              handleDislike();
              setLiked(false);
              like ? setLikes(likes.length - 1) : setLikes(likes.length);
            }}
          />
        ) : (
          <>
            {session?.user ? (
              <IoHeartOutline
                className="hover:text-primary cursor-pointer text-2xl"
                onClick={() => {
                  handleLike();
                  setLiked(true);
                  like ? setLikes(likes.length) : setLikes(likes.length + 1);
                }}
              />
            ) : (
              <IoHeartOutline className="text-2xl" />
            )}
          </>
        )}
      </button>
    </>
  );
};

export default Like;
