import Image from "next/image";
import { ImagePost } from "@types";
import { IoChatbubble, IoHeart } from "react-icons/io5";

interface IProps {
  post: ImagePost;
}

const GalleryCard = ({ post }: IProps) => {
  return (
    <div className="group relative">
      <Image
        src={post.image.asset.url}
        alt={post.caption}
        width={300}
        height={300}
      />{" "}
      <div className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 flex justify-center items-center text-xl w-full h-full bg-black bg-opacity-50 bottom-0">
        <div className="flex text-white text-xl gap-2 items-center ">
          <IoChatbubble />
          <p className=""> {post.comments.length}</p>
          <IoHeart />
          <p className=""> {post.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
