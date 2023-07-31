"use client";
import { ImageCard, Loader, NoResults } from "@components";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ImagePost } from "@types";

const Search = ({ params }: { params: { searchTerm: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const [isAccounts, setIsAccounts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const posts = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const handleDelete = async (postId: string) => {
    setIsLoading(true);
    try {
      await fetch(`/backend/post/${postId}`, {
        method: "DELETE",
      }).then((res) => {
        getResults(params.searchTerm);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search/${searchTerm}`);
    }
  };

  const getResults = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      await fetch(`/backend/search/${searchTerm}`).then(async (data) =>
        setPostList(await data.json())
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getResults(params.searchTerm);
  }, []);

  useEffect(() => {
    getResults(params.searchTerm);
  }, [params.searchTerm]);
  return (
    <article className="w-full">
      <section className=" mt-5 bg-white w-full px-10">
        {/* <p
          className={`text-xl font-semibold cursor-pointer ${posts} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Posts
        </p> */}
        <form className="bg-white flex" onSubmit={handleSearch}>
          <input
            className="w-full border-0 focus:outline-none border-gray-100 outline-none focus:border-gray-200 focus:ring-primary rounded-full p-3 "
            type="text"
            value={searchTerm}
            placeholder="Search posts"
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="search bar"
          />
          <button
            onClick={handleSearch}
            className="md:right-5 right-6 border-gray-300 pl-4 text-2xl text-gray-400 hover:text-primary"
            aria-label="Search topic"
          >
            <IoSearchOutline />
          </button>
        </form>
        {/* <p
          className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p> */}
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="flex flex-wrap gap-6 md:justify-start md:mt-16 justify-center">
          {postList.length ? (
            postList.map((post: ImagePost) => (
              <ImageCard
                handleDelete={handleDelete}
                post={post}
                key={post._id}
              />
            ))
          ) : (
            <NoResults text="No results" />
          )}
          {/* {isAccounts ? (
            <div className="">
              {postList.length ? (
                postList.map((post) => (
                  <ImageCard
                    handleDelete={handleDelete}
                    post={post}
                    key={post.id}
                  />
                ))
              ) : (
                <NoResults text="No results" />
              )}
            </div>
          ) : (
            <div className="">
              {postList.length ? (
                postList.map((post) => (
                  <ImageCard
                    handleDelete={handleDelete}
                    post={post}
                    key={post.id}
                  />
                ))
              ) : (
                <NoResults text="No results" />
              )}
            </div>
          )} */}
        </section>
      )}
    </article>
  );
};

export default Search;
