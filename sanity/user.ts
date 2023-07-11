export default {
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
      name: "image",
      title: "Profile Picture",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "email",
    },
  ],
};
