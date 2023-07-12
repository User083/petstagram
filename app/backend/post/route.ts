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

export const POST = async (request: Request) => {
  const document = await request.json();
  try {
    await client.create(document);
    return new Response("Successful creation", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Unable to upload", { status: 400 });
  }
};
