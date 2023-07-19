import { client } from "@/utils/client";
import { singlePostQuery, postDetailQuery } from "@/utils/queries";
import { randomUUID } from "crypto";

export const GET = async (request: Request, { params }: any) => {
  try {
    const query = postDetailQuery(params.id);
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};

export const PUT = async (request: Request, { params }: any) => {
  const document = await request.json();

  const { userId, comment, postId } = document;

  try {
    const data = await client
      .patch(postId)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: randomUUID(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response("Failed to post comment", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    const data = await client.delete(params.id);
    return new Response(JSON.stringify(data), { status: 202 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
