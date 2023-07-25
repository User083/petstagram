import Image from "next/image";
import { ImagePost } from "@types";
import { IoChatbubble, IoHeart } from "react-icons/io5";

interface IProps {
  post: ImagePost;
}

const GalleryCard = ({ post }: IProps) => {
  return (
    <article className="group relative hover:cursor h-[300px] w-[300px]">
      <>
        {" "}
        <Image
          src={post.image.asset.url}
          alt={post.caption}
          objectFit="cover"
          fill={true}
        />{" "}
      </>

      <section className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 flex justify-center items-center text-xl w-full h-full bg-black bg-opacity-50 bottom-0">
        <div className="flex flex-col justify-center items-center">
          <span className="flex text-white text-xl gap-2 items-center ">
            <IoChatbubble />
            <p className=""> {post.comments.length}</p>
            <IoHeart />
            <p className=""> {post.likes.length}</p>
          </span>{" "}
          <p className="text-sm text-white">
            {" "}
            by {post.postedBy.userName.replace(/\s+/g, "")}
          </p>
        </div>
      </section>
    </article>
  );
};

export default GalleryCard;
