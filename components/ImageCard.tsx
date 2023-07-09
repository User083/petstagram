"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImagePost } from "@/types";
import { NextPage } from "next";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: ImagePost;
}

const ImageCard: NextPage<IProps> = ({ post }) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  src={post.postedBy.profilePicture.asset.url}
                  alt="Profile Photo"
                  width={62}
                  height={62}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  {``}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
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
                width={200}
                height={200}
                className="bg-gray-100 cursor-pointer rounded-2xl w-[200px] lg:h-[530px] md:h-[400px] lg:w-[600px] h-[300px]"
              />
            </>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
