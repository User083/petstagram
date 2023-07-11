import { client } from "@utils/client";
import { allUsersQuery } from "@utils/queries";

export const GET = async (request: Request) => {
  try {
    const query = allUsersQuery();
    const data = await client.fetch(query);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed to retrieve all users", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  const data = request.body;
  console.log(data, "POST DATA");

  return new Response("Successful creation", { status: 200 });
};
