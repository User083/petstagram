import { client } from "@/utils/client";
import { singleUserQuery } from "@/utils/queries";

export const GET = async (request: Request, { params }: any) => {
  try {
    const query = singleUserQuery(params.id);
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};

export const PUT = async (request: Request, { params }: any) => {
  const document = await request.json();
  const userId = params.id;
  const { followerId, follower } = document;
  try {
    follower
      ? await client
          .patch(userId)
          .setIfMissing({ followers: [] })
          .insert("after", "followers[-1]", [
            { _key: followerId, _ref: followerId },
          ])
          .commit()
      : await client
          .patch(userId)
          .unset([`followers[_ref=="${followerId}"]`])
          .commit();
    return new Response("Successful creation", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 400 });
  }
};
