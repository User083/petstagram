import { client } from "@/utils/client";
import { userCreatedPostsQuery } from "@/utils/queries";

export const GET = async (request: Request, { params }) => {
  try {
    const query = userCreatedPostsQuery(params.id);
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
