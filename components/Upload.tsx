"use client";
import { useState, useEffect } from "react";
import { client } from "@utils/client";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SanityAssetDocument } from "next-sanity";
import Image from "next/image";
import { topics } from "@utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const Upload = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [asset, setAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const uploadImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/tiff",
    ];
    if (fileTypes.includes(selectedFile.type)) {
      setIsUploading(true);
      setWrongFileType(false);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setAsset(data);
          setIsUploading(false);
        });
    } else {
      setIsUploading(false);
      setWrongFileType(true);
    }
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handlePost = async () => {
    if (caption && asset?._id && category && session?.user) {
      setSavingPost(true);
      const document = {
        _type: "post",
        uploaded: asset._createdAt.toString(),
        caption,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset?._id,
          },
        },
        userId: session?.user._id,
        postedBy: {
          _type: "postedBy",
          _ref: session?.user._id,
        },
        topic: category,
        likes: [],
        comments: [],
      };
      try {
        setSavingPost(true);
        await fetch("/backend/post", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(document),
        }).then((res) =>
          res.ok ? router.push("/") : console.log("Failed to upload")
        );
      } catch (error) {
        console.log(error);
      } finally {
        setSavingPost(false);
      }
    }
  };
  return (
    <article className="flex w-full h-full min-h-screen py-0 md:py-10 md:pb-20 justify-center bg-gray-200 z-0">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="rounded-lg flex items-center justify-center flex-wrap gap-3 bg-white px-5 md:px-20 md:my-20">
            <section>
              <p className="text-2xl font-bold">Upload Image</p>
              <p className="text-md text-gray-400 mt-1">Post a new image</p>
              <div className="border-dashed rounded-xl border-4 border-gray-400 flex flex-col justify-center items-center outline-none mt-10 cursor-pointer hover:border-primary hover:bg-gray-100 w-[260px] h-[460px] p-10">
                {isUploading ? (
                  <p>Uploading...</p>
                ) : (
                  <div>
                    {asset ? (
                      <div className="">
                        <Image
                          src={asset?.url}
                          alt="Uploaded Image"
                          className="mt-16 bg-black rounded-xl"
                          height={450}
                          width={300}
                        />
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="flex flex-col items-center justify-center">
                            <p className="font-bold text-xl">
                              <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                            </p>
                            <p className="text-xl font-bold">Upload Image</p>
                          </div>
                          <p className="text-sm leading-10 mt-10 text-gray-400 text-center">
                            JPG, PNG, GIF
                            <br />
                            <br />
                          </p>
                          <p className="text-center rounded mt-10 font-medium p-2 outline-none w-52 bg-primary text-white hidden lg:block">
                            Select File
                          </p>
                        </div>
                        <input
                          type="file"
                          name="upload-image"
                          className="w-0 h-0"
                          onChange={uploadImage}
                        />
                      </label>
                    )}
                  </div>
                )}
                {wrongFileType && (
                  <p className="text-center text-center mt-4 w-[250px] text-xl text-red">
                    Incorrect file type
                  </p>
                )}
              </div>
            </section>
            <section className="flex flex-col gap-3 pb-10">
              <label className="text-md font-medium">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                className="rounded outline-non text-md border-2 border-gray-200 p-2 focus:border-primary focus:ring-primary"
              />
              <label className="text-md font-medium">Select a category</label>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="lg:p-4 outline-none border-2 border-gray-200 capitalize p-2 cursor-pointer rounded focus:border-primary focus:ring-primary"
              >
                {topics.map((topic) => (
                  <option
                    key={topic.name}
                    className="text-md outline-none p-2 text-gray-700"
                    value={topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-6 mt-10">
                <button
                  onClick={handlePost}
                  type="button"
                  className=" p-2 rounded lg:w-44 outline-none w-28 bg-primary text-white"
                  name="Upload"
                  aria-label="Upload"
                >
                  Upload
                </button>
                <button
                  onClick={() => {
                    setAsset(undefined);
                    setCaption("");
                    setCategory(topics[0].name);
                    setWrongFileType(false);
                  }}
                  type="button"
                  className="border-gray-300 p-2 rounded lg:w-44 outline-none w-28 border-2 hover:border-primary"
                  name="Discard"
                  aria-label="Discard"
                >
                  Discard
                </button>
              </div>
            </section>
            {savingPost && (
              <p className="animate:pulse text-gray-600">Saving post...</p>
            )}
          </div>
        </>
      )}
    </article>
  );
};

export default Upload;
