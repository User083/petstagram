export default {
  name: "post",
  title: "Post",
  type: "document",
  createdAt: "string",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(1).warning("You need to be logged in to post"),
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
    {
      name: "topic",
      title: "Topic",
      type: "string",
    },
  ],
};
