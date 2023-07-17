import { client } from "@/utils/client";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "@/utils/queries";

export const GET = async (request: Request, { params }: any) => {
  try {
    const query = singleUserQuery(params.id);
    const userVideosQuery = userCreatedPostsQuery(params.id);
    const userLikedVideosQuery = userLikedPostsQuery(params.id);
    const user = await client.fetch(query);
    const userPosts = await client.fetch(userVideosQuery);
    const userLikedPosts = await client.fetch(userLikedVideosQuery);
    const data = { user: user[0], userPosts, userLikedPosts };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
