import { client } from "@/utils/client";
import { allUsersQuery } from "@/utils/queries";

export async function GET(request: Request) {
  const query = allUsersQuery();
  const data = await client.fetch(query);
  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const user = request.body;
  await client.createIfNotExists(user);
  return new Response().status;
}
