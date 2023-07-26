"use client";
import { GalleryCard, Loader, NoResults } from "@/components";
import { IUser, ImagePost } from "@types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiMoreHorizontal } from "react-icons/fi";

interface IProps {
  data: {
    user: IUser;
    userPosts: ImagePost[];
    userLikedPosts: ImagePost[];
  };
}

const MyProfile = ({ params }: { params: { userId: string } }) => {
  const { data: session } = useSession();
  const [following, setFollowing] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState<Boolean>(true);
  const [postList, setPostList] = useState<ImagePost[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const posts = showUserPosts ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserPosts ? "border-b-2 border-black" : "text-gray-400";
  const [data, setData] = useState<IProps>({
    user: { _id: "", userName: "", profilePicture: "", followers: [] },
    userPosts: [],
    userLikedPosts: [],
  });

  const getProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      await fetch(`/backend/profile/${userId}`).then(async (data) =>
        setData(await data.json())
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    if (showUserPosts) {
      setPostList(data.userPosts);
    } else {
      setPostList(data.userLikedPosts);
    }
  };

  const handleFollow = async (follower: boolean) => {
    if (session?.user._id) {
      try {
        const followerData = {
          followerId: session.user._id,
          follower,
        };

        await fetch(`/backend/users/${params.userId}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(followerData),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const filterFollowers = data.user.followers?.filter(
    (item) => item._key === session?.user._id
  );
  useEffect(() => {
    getProfile(params.userId);

    if (filterFollowers?.length > 0) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [showUserPosts, data.userLikedPosts, data.userPosts]);
  return (
    <article className="sm:w-full m-10">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <section className="flex items-center justify-between w-full relative">
            <span className="flex gap-6 md:gap-10 mb-4 bg-white w-full items-center">
              <div className="w-16 h-16 md:w-32 md:h-32">
                <Image
                  width={120}
                  height={120}
                  className="rounded-full"
                  src={data.user.profilePicture}
                  alt="user-profile"
                />
              </div>

              <div>
                <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
                  <span>{data.user.userName.replace(/\s+/g, "")} </span>
                  <MdVerified className="text-blue-400 md:text-xl text-md" />
                </div>
                <p className="text-sm font-medium"> {data.user.userName}</p>
              </div>
            </span>
            <div className="relative">
              {session?.user ? (
                <FiMoreHorizontal
                  className="text-2xl cursor-pointer hover:text-primary"
                  onClick={() => {
                    setShowOptions((prev) => !prev);
                  }}
                />
              ) : (
                <></>
              )}

              {showOptions ? (
                <div className="py-2 px-2 flex flex-col rounded-xl bg-[#211C1D] absolute right-0 min-w-[200px]">
                  <>
                    {session?.user._id === data.user._id ? (
                      <>
                        <button
                          onClick={() => {
                            setShowOptions(false);
                          }}
                          name="Edit Profile"
                          aria-label="Edit profile"
                          className="text-sm text-white py-2 px-2"
                        >
                          Edit Profile
                        </button>{" "}
                        <button
                          onClick={() => {
                            signOut();
                            setShowOptions(false);
                          }}
                          className="text-sm text-white py-2 px-2"
                          name="Sign out"
                          aria-label="Sign out"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        {following ? (
                          <button
                            onClick={() => {
                              handleFollow(false);
                              setFollowing(false);
                              setShowOptions(false);
                            }}
                            name="Unfollow"
                            aria-label="Unfollow"
                            className="text-sm text-white py-2 px-2"
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleFollow(true);
                              setFollowing(true);
                              setShowOptions(false);
                            }}
                            className="text-sm text-white py-2 px-2"
                            name="Follow"
                            aria-label="Follow"
                          >
                            Follow
                          </button>
                        )}
                      </>
                    )}
                  </>
                </div>
              ) : (
                <></>
              )}
            </div>
          </section>
          <span>
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
              <p
                className={`text-xl font-semibold cursor-pointer ${posts} mt-2`}
                onClick={() => setShowUserPosts(true)}
              >
                Posts
              </p>
              <p
                className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
                onClick={() => setShowUserPosts(false)}
              >
                Liked
              </p>
            </div>
          </span>
          <section className="flex flex-wrap justify-center">
            {postList?.length > 0 ? (
              postList.map((post: ImagePost, idx: number) => (
                <Link href={`/post/${post._id}`}>
                  <GalleryCard key={idx} post={post} />
                </Link>
              ))
            ) : (
              <NoResults
                text={`No ${showUserPosts ? "" : "Liked"} Posts Yet`}
              />
            )}
          </section>
        </>
      )}
    </article>
  );
};

export default MyProfile;
