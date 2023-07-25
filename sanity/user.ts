export default {
  _id: "string",
  name: "user",
  title: "User",
  type: "document",

  fields: [
    {
      name: "userName",
      title: "Username",
      type: "string",
    },
    {
      name: "profilePicture",
      title: "Profile Picture",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "email",
    },
    {
      name: "id",
      title: "userID",
      type: "string",
    },
    {
      name: "followers",
      title: "Followers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
  ],
};
