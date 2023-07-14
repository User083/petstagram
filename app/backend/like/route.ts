import { client } from "@utils/client";
import { randomUUID } from "crypto";

export const PUT = async (request: Request) => {
  const document = await request.json();
  const { userId, postId, like } = document;
  try {
    like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [{ _key: randomUUID(), _ref: userId }])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    return new Response("Successful creation", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Unable to upload", { status: 400 });
  }
};
