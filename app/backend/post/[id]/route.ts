import { client } from "@/utils/client";
import { singlePostQuery } from "@/utils/queries";

export const GET = async (request: Request, { params }: any) => {
  try {
    const query = singlePostQuery(params.id);
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    const query = singlePostQuery(params.id);
    await client.delete(query);
    return new Response("Post successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
