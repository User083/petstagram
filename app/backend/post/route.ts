import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";

export const GET = async (request: Request) => {
  try {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
