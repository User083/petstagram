import { MdDelete, MdCancel } from "react-icons/md";

const PostOptions = ({ handleDelete, setShowOptions, userId, postedBy }) => {
  return (
    <div className="absolute bg-gray-700 text-white rounded-xl w-full h-full py-2 px-2 lg:w-[200px] lg:h-[400px] z-80">
      <div className="flex flex-row-reverse justify-between">
        <MdCancel
          className="text-white hover:opacity-90"
          onClick={() => {
            setShowOptions((prev: boolean) => !prev);
          }}
        />
        <div>
          {userId === postedBy._id ? (
            <button
              className="py-2 px-2 flex gap-2 items-center"
              onClick={handleDelete}
            >
              <MdDelete className="text-2xl" />
              <p>Delete</p>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
