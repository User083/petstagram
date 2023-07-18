import { MdDelete } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  handleDelete: () => void;
  handlesetShowOptions: Dispatch<SetStateAction<boolean>>;
  userId: string;
  posterId: string;
}

const PostOptions = ({
  handleDelete,
  setShowOptions,
  userId,
  posterId,
}: IProps) => {
  return (
    <div className="absolute bg-black text-white bg-opacity-60 py-2 px-2 z-80 left-0 bottom-0 right-0 top-0 object-cover pointer-events-none  object-cover">
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-[#211C1D] py-2 px-2 rounded-xl flex flex-col gap-3 justify-center font-semibold items-center w-[250px] md:w-[400px] lg:h-[500px] md:h-[300px] lg:w-[300px] h-[300px] ">
          {userId === posterId ? (
            <button
              className="py-2 px-2 flex gap-2 items-center border-gray-200 border-b w-full flex justify-center pointer-events-auto"
              onClick={() => {
                handleDelete;
                setShowOptions((prev: boolean) => !prev);
              }}
            >
              <MdDelete className="text-2xl text-[#D10000]" />
              <p className="text-[#D10000]">Delete</p>
            </button>
          ) : (
            <></>
          )}
          <button
            className="py-2 px-2 flex gap-2 items-center border-gray-200 border-b w-full flex justify-center pointer-events-auto"
            onClick={() => {}}
          >
            <p>Go to post</p>
          </button>
          <button
            className="py-2 px-2 flex gap-2 w-full flex items-center justify-center pointer-events-auto"
            onClick={() => {
              setShowOptions((prev: boolean) => !prev);
            }}
          >
            <p>Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
