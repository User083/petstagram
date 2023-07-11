import ImageCard from "./ImageCard";
const Profile = ({ name, desc, data }) => {
  return (
    <section className="w-full">
      <h1 className="">
        <span>{name}'s Profile</span>
      </h1>
      <p>{desc}</p>
      <div>
        {data.map((post) => (
          <ImageCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
